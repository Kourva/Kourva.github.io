from pyscript import window, document, display


def add_balacne(event):
    balance = document.querySelector("#coin_balance")
    balance.innerHTML = str(int(balance.innerHTML) + 1)
    navigator.vibrate(10)
