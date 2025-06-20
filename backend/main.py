from fastapi import FastAPI, UploadFile, File, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse, Response
from pathlib import Path
import uuid, shutil
from urllib.parse import quote

from conversions.pdf_to_docx import convert_pdf_to_docx
from conversions.docx_to_pdf import convert_docx_to_pdf

app = FastAPI()

# Standard CORS setup
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
    expose_headers=["Content-Disposition"],
)

# Ensure Access-Control-Allow-Origin is always present
@app.middleware("http")
async def add_cors_header(request: Request, call_next):
    # Handle preflight
    if request.method == "OPTIONS":
        return Response(
            status_code=204,
            headers={
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "*",
                "Access-Control-Allow-Headers": "*",
            },
        )
    # For all other requests
    response = await call_next(request)
    response.headers["Access-Control-Allow-Origin"] = "*"
    return response

@app.post("/convert/pdf-to-docx")
async def pdf_to_docx_endpoint(file: UploadFile = File(...)):
    stem = Path(file.filename).stem
    tmp_pdf = f"/tmp/{uuid.uuid4()}.pdf"
    tmp_docx = tmp_pdf.replace(".pdf", ".docx")
    with open(tmp_pdf, "wb") as buf:
        shutil.copyfileobj(file.file, buf)
    try:
        convert_pdf_to_docx(tmp_pdf, tmp_docx)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    out_name = f"OnlyConvert-com-{stem}.docx"
    resp = FileResponse(
        tmp_docx,
        media_type="application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    )
    ascii_name = out_name.encode("ascii", "ignore").decode()
    quoted_name = quote(out_name)
    resp.headers["Content-Disposition"] = (
        f'attachment; filename="{ascii_name}"; filename*=UTF-8\'\'{quoted_name}'
    )
    return resp

@app.post("/convert/docx-to-pdf")
async def docx_to_pdf_endpoint(file: UploadFile = File(...)):
    stem = Path(file.filename).stem
    tmp_docx = f"/tmp/{uuid.uuid4()}.docx"
    tmp_pdf = tmp_docx.replace(".docx", ".pdf")
    with open(tmp_docx, "wb") as buf:
        shutil.copyfileobj(file.file, buf)
    try:
        convert_docx_to_pdf(tmp_docx, tmp_pdf)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    out_name = f"OnlyConvert-com-{stem}.pdf"
    resp = FileResponse(
        tmp_pdf,
        media_type="application/pdf"
    )
    ascii_name = out_name.encode("ascii", "ignore").decode()
    quoted_name = quote(out_name)
    resp.headers["Content-Disposition"] = (
        f'attachment; filename="{ascii_name}"; filename*=UTF-8\'\'{quoted_name}'
    )
    return resp
