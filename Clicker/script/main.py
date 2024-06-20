from pyscript import PyWorker
from pyscript import window, document, display
from js import navigator, screen
from pyscript import sync

# Expend the app
window.Telegram.WebApp.expand()

# Bootstrap the Pyodide worker, with optional config too.
# The worker is:
#   * Owned by this script, no JS or Pyodide code in the same page can access
#     it.
#   * It allows pre-sync methods to be exposed.
#   * It has a ready Promise to await for when Pyodide is ready in the worker. 
#   * It allows the use of post-sync (methods exposed by Pyodide in the
#     worker).
worker = PyWorker("./script/main.py", type="pyodide")

# wait until Pyodide has completed its bootstrap, and is ready.
worker.ready
print("Python Log: Pyodide bootstrapped.")

# Show the result at the end of the body.
document.querySelector("#main_loader").remove()

# Free memory and get rid of everything in the worker.
worker.terminate()

document.querySelector("#body_container").innerHTML += window.Telegram.WebAppUser.id
document.querySelector("#body_container").innerHTML += window.Telegram.WebAppUser.first_name
