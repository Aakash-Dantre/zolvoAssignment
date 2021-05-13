# Zolvo Assignment

- backend in django
- frontend in react
- database in postgress

## setup backend
- Install dependencies
```
pip3 install -r requirements.txt
```
- Add postgres database credentials to django settings.py
```
cd backend/backend/settings.py
subl settings.py

DATABASES = {
    'default': {
        # 'ENGINE': 'django.db.backends.sqlite3',
        # 'NAME': BASE_DIR / 'db.sqlite3',
        'ENGINE': 'django.db.backends.postgresql_psycopg2',

        'NAME': 'zolvo1',

        'USER': 'postgres',

        'PASSWORD': 'po6S.dance',

        'HOST': 'localhost',

        'PORT': '5432',
    }
}
```
- makemigrations and migrate models to database
```
python3 manage.py makemigrations
python3 manage.py migrate
```
- run backend **on port 8000**
```
python3 manage.py runserver
```
## setup frontend

- in a new terminal, go to frontend, and install all dependencies
```
cd forntend
npm install
```
- run frontend
```
npm start
```
# zolvoAssignment
