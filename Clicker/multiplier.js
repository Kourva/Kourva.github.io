function Upgrade() {
  if (balance >= (multiplierCost * multiplierCostMultiplier)) {

    multiplier += 0.5 * multiplierCostMultiplier;
    balance -= (multiplierCost * multiplierCostMultiplier);

    multiplierCostMultiplier += 1;
    multiplierCost = (multiplierCost * multiplierCostMultiplier);
    updateCount()
    document.getElementById('Multiplier').innerText = 'Upgrade Multiplier ($' + (multiplierCost * multiplierCostMultiplier) + ')'
  }
}