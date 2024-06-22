from pyscript import window, document, display

def add_balacne(event):
    balance = document.querySelector("#coin_balance")
    tap_value = document.querySelector("#tap_value").innerHTML
    balance.innerHTML = str(int(balance.innerHTML) + int(tap_value))

    window.navigator.vibrate(50)

def upgrade_tap(event):
    balance = int(document.querySelector("#coin_balance").innerHTML)
    balance_area = document.querySelector("#coin_balance_button")
    
    tap_value = int(document.querySelector("#tap_value").innerHTML)
    tap_level = tap_value
    tap_money = int(document.querySelector("#tap_money").innerHTML)

    if balance => tap_money:
        balance -= tap_money
        tap_level += 1
        tap_value += 1
        tap_money = 2**tap_level

        document.querySelector("#coin_balance").innerHTML = str(balance)
        document.querySelector("#tap_value").innerHTML = str(tap_value)
        document.querySelector("#tap_money").innerHTML = str(tap_money)
        
    else:
        window.navigator.vibrate(300)
        window.alert("Not enough balance")
