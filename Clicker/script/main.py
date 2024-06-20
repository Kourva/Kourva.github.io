from pyscript import PyWorker
from pyscript import window, document, display
from js import navigator
from pyscript import sync

# Bootstrap the MicroPython worker.
worker = PyWorker("./script/main.py", type="micropython")

# wait until Pyodide has completed its bootstrap, and is ready.
worker.ready
print("Python Log: Pyodide bootstrapped.")

# Show the result at the end of the body.
document.querySelector("#main_loader").remove()

# Free memory and get rid of everything in the worker.
worker.terminate()

print(dir(window.Telegram.WebApp))

user_data = document.createElement("div");
user_data.appendChild(
    document.createTextNode(
        f"User Data:\n{window.Telegram.WebApp}"
    )
)
document.body.append(user_data)
