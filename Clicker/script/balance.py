from pyscript import window, document, display
from js import navigator

def add_balacne(event):
    balance = document.querySelector("#coin_balance")
    balance.innerHTML = str(int(balance.innerHTML) + 1)
    navigator.vibrate(10)
