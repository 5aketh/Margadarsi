import os
from google import genai
from google.genai.types import FileData, Part, Content

# Set up your environment variables
os.environ["GOOGLE_API_KEY"] = "API_KEY" #To be UPDATED
os.environ["GOOGLE_CLOUD_PROJECT"] = "PROJECT_ID" #To be UPDATED
os.environ["GOOGLE_CLOUD_LOCATION"] = "asia-south2"
os.environ["GOOGLE_GENAI_USE_VERTEXAI"] = "True"

# Create a client
client = genai.Client(api_key="API_KEY")

# Initialize a model (Gemini for example)
model = "gemini-1.5-flash"


def fetch_questions(keyword, location, experience):
    prompt = "Imagine you are an interviewer of a decorated firm interviewing an interview candidate from {} of {} background and {} year(s) experience, what 6 questions would you ask to determine the candidate's skill and worth all while maintaining a friendly environment".format(location, keyword, experience)
    response = client.models.generate_content(
        model= model,
        contents= prompt
    )
    return response.text


def interview_result(url, keyword, location, experience):
    prompt = "Imagine you are an interviewer of a decorated firm interviewing an interview candidate from {} of {} background and {} year(s) experience, keeping your company's best interests in mind rate the candidate by his/her answers and body language and generate a report which includes his/her mistakes and areas of improvement".format(location, keyword, experience)
    contents = [
        Part.from_uri(
            file_uri=url,
            mime_type="video/webm"
        ),
        Part(text=prompt)
    ]

    response = client.models.generate_content(
        model=model,
        contents=contents
    )

    return response.text

