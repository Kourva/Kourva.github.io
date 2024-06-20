let balance = 0;
let multiplier = 1;

let multiplierCost = 10;
let multiplierCostMultiplier = 1;

document.getElementById('Multiplier').innerText = 'Upgrade Multiplier ($' + (multiplierCost) + ')'





function updateCount() {
  document.getElementById('Text').innerText = '$' + balance;
  //console.log(balance) (for debug purposes)
}