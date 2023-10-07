import os
command = os.system
if not os.path.exists("env"):
    print("Env Create.......")
    command("python -m venv env")
    

# print(isExist)
command_list = [
        # "/env/Scripts/Activate",
        "pip install -r app/requirements.txt", 
        "python app/manage.py makemigrations",
        "python app/manage.py migrate",
        "python app/manage.py runserver"
    ]

for exe in command_list:
    command(exe)


