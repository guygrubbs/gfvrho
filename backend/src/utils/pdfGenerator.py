"""
pdfGenerator.py

This module defines functionality for generating a PDF from textual content and uploading it
to an S3 bucket. The generate_pdf function produces the PDF, applies a watermark, uploads it
to S3, and returns the file's public URL (or a pre-signed URL, depending on your needs).

Best Practices:
1. Store S3 credentials and configuration in environment variables or a secure vault (e.g., AWS Secrets Manager).
2. Use a temporary location for PDF generation, or generate in-memory if feasible.
3. Handle file cleanup and exceptions gracefully to avoid resource leaks.

Dependencies:
- WeasyPrint, ReportLab, or another Python PDF library. Below we demonstrate WeasyPrint for
  HTML-based PDF generation. Adjust as needed for your use case.
- Boto3 for AWS S3 integration.

Notes:
- For a real project, consider advanced watermarking or a specialized approach to overlay text
  or images on each page. The below code shows a simplified demonstration.
- Make sure the S3 bucket allows write access from your AWS credentials, and set the correct
  ACL or pre-signed URL policy if you need a public link.
"""

import os
import uuid
import boto3
import tempfile
from weasyprint import HTML, CSS

# Example environment variables for S3
S3_BUCKET_NAME = os.environ.get("GFVRHO_S3_BUCKET_NAME", "CHANGE_ME")
AWS_REGION = os.environ.get("AWS_REGION", "us-east-1")

s3_client = boto3.client("s3", region_name=AWS_REGION)

def generate_pdf(content: str, watermark_text: str) -> str:
    """
    Generates a PDF from the provided content, applies a watermark, uploads the PDF to S3,
    and returns the S3 file URL.

    :param content: The textual (HTML) content for the PDF body.
    :param watermark_text: A watermark message to overlay on each page.
    :return: A string containing the S3 URL or pre-signed URL of the uploaded PDF.
    :raises Exception: If PDF generation or upload fails.
    """
    # 1. Convert the textual content to simple HTML structure for WeasyPrint.
    #    Real usage might involve more complex HTML/CSS for styling.
    html_content = f"""
    <html>
      <head>
        <style>
          /* Example styling */
          body {{
            font-family: Arial, sans-serif;
            margin: 2em;
          }}
          .watermark {{
            position: fixed;
            top: 50%%; 
            left: 50%%; 
            transform: translate(-50%%, -50%%);
            font-size: 48px;
            color: rgba(100, 100, 100, 0.2);
            z-index: 9999;
            pointer-events: none;
          }}
          .report-content {{
            position: relative;
            z-index: 1;
          }}
        </style>
      </head>
      <body>
        <div class="watermark">{watermark_text}</div>
        <div class="report-content">
          {content}
        </div>
      </body>
    </html>
    """

    # We could also do a multi-step approach for advanced watermarking (e.g., multiple pages),
    # but for simplicity, we use a CSS overlay approach above.

    try:
        # 2. Generate the PDF in a temporary file.
        with tempfile.NamedTemporaryFile(suffix=".pdf", delete=False) as tmp_pdf:
            tmp_pdf_path = tmp_pdf.name

        HTML(string=html_content).write_pdf(tmp_pdf_path, stylesheets=[CSS(string="")])

        # 3. Upload the PDF to S3.
        #    Generate a unique key so we don't overwrite existing files.
        pdf_key = f"reports/{uuid.uuid4()}.pdf"

        with open(tmp_pdf_path, "rb") as file_data:
            s3_client.upload_fileobj(
                Fileobj=file_data,
                Bucket=S3_BUCKET_NAME,
                Key=pdf_key,
                ExtraArgs={"ContentType": "application/pdf"}
            )

        # 4. Construct a public or pre-signed URL for the uploaded PDF (depending on your needs).

        # Option A: If the S3 bucket is public or you set the object ACL to public-read, 
        # build a public URL. (Not recommended for sensitive data.)
        # public_url = f"https://{S3_BUCKET_NAME}.s3.{AWS_REGION}.amazonaws.com/{pdf_key}"

        # Option B: Generate a pre-signed URL that expires after a certain time.
        # This is more secure if you want temporary access.
        presigned_url = s3_client.generate_presigned_url(
            ClientMethod="get_object",
            Params={
                "Bucket": S3_BUCKET_NAME,
                "Key": pdf_key
            },
            ExpiresIn=3600  # 1 hour
        )

        return presigned_url

    except Exception as e:
        raise Exception(f"Error generating or uploading PDF: {str(e)}")
    finally:
        # Clean up the temporary file
        if os.path.exists(tmp_pdf_path):
            os.remove(tmp_pdf_path)
