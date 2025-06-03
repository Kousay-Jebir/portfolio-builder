## ⚙️ Prerequisites

- Python 3.10 or later
- pip (Python package manager)
- ollama (to run the LLM locally untill we get the openAI API):
- -download Ollama (from google)
- -once downloaded run the following command to download the mistral LLM
- ollama run mistral

---

## 🚀 Installation

### 1. Create a Virtual Environment

- python -m venv .venv
- source .venv/Scripts/activate (windows bash)

### 2.Upgrade pip

- python -m pip install --upgrade pip

### 3.Add .gitignore

- echo "\*" > .venv/.gitignore

### 4.Install Packages(from requirements)

- pip install -r requirements.txt

### 5.Run the development server

- uvicorn main:app --reload
  visit http://localhost:8000
- to test that mistral works just fine: try using postman (or other) POST /test {"prompt":"What's a good resume summary for a computer science student?"}

## Important !!

- please after every package installation, make sure to add it to the requirement file so that we would all have the same dependencies

pip freeze > requirements.txt

- and everytime you git pull, make sure to install the dependencies

- pip install -r requirements.txt
