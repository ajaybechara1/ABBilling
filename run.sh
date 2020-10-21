source "./venv/bin/activate"
nohup python manage.py runserver &

cd ismorphic
nohup serve -s build &

ll
