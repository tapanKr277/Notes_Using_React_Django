# 📝 Notes App

A simple full-stack Notes application built using **React** for the frontend and **Django REST Framework** for the backend. Users can create, update, and delete notes. Backend is deployed on **Render** and frontend supports deployment or local development.

---

## 🌐 Live Demo

- [https://notes-using-react-django.onrender.com/api/notes/](https://notes.tapmad.space/)

---

## 🛠 Tech Stack

### Frontend:
- React
- React Router DOM
- React Hot Toast (for notifications)

### Backend:
- Django
- Django REST Framework
- CORS Headers

---

## 📁 Project Structure
📦Notes_Using_React_Django/notes-app/
┣ 📂frontend/ # frontend
┣ 📂/ # backend
┣ README.md
┗ .gitignore

---

## 🚀 Getting Started

### Backend Setup (Django)

1. Navigate to the `notes-app` directory:
   ```bash
   cd notes-app
   
2. Create and activate a virtual environment:

python -m venv env
source env/bin/activate  # On Windows: env\Scripts\activate

3. Install dependencies:
   
  pip install -r requirements.txt

5. Run migrations:

  python manage.py runserver

Frontend Setup (React)

cd frontend

npm install

npm start (make sure change the baseURL to = 127.0.0.1:8000)

