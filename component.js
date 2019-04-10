"use strict";

const comp = {
    templateUrl:'component.html',
    controller:[function(){
        const vm = this;
        vm.counter = 0;
        vm.x = 0;
        vm.villain;
        vm.vdead = false;
        vm.hero = {
            name: "Hero",
            health: 10,
            attack: 1,
            special: 4,
            mana: 10,
            hpot: 1,
            mpot: 1,
            level: 1,
            experience: 0
        }
        vm.villains = [
            {
                name: "Goblin",
                health: 8,
                attack: 2,
                level: 1,
                experience: 50,
                img: 'Goblin.png'
            },
            {
                name: "Blob",
                health: 10,
                attack: 1,
                level: 2,
                experience: 50,
                img: 'Blob.png'
            },
            {
                name: "Ghost",
                health: 2,
                attack: 3,
                level: 3,
                experience: 100,
                img: 'Ghost.png'
            },
            {
                name: "Demon",
                health: 12,
                attack: 3,
                level: 4,
                experience: 100,
                img: 'Demon.png'
            },
        ];
        vm.villainCycle = function() {
            vm.villain = vm.villains[vm.x];
            vm.x++;
        }
        vm.villainCycle();
       
        vm.checkState = function() {
            if (vm.villain.name === "Demon" && vm.villain.health <= 0) {
               alert("The hero wins!");
               vm.vdead = true;
                return;
            }
            else if (vm.villain.health <= 0) {
                vm.reviveVillain();
                vm.hero.experience += vm.villain.experience;
               alert(`The hero has ${vm.hero.experience} experience points`);
                let treasurechance =  Math.floor(Math.random()*10)+1;
                if (treasurechance % 2 === 0) {
                    vm.hero.hpot += 1;
                   alert("The monster dropped a health potion!");
                }
                else if (treasurechance % 5 === 0) {
                    vm.hero.mpot += 1;
                   alert("The monster dropped a mana potion!");
                }
                else {
                    alert("Searched the fallen monster, but didn't find anything");
                }
            }
            if (vm.hero.health <=0) {
               alert("The hero has died. Game Over");
            }
            if (vm.hero.experience >= 100) {
                vm.hero.health = 10 + vm.counter;
                vm.hero.experience = 0;
                vm.hero.level++;
                vm.hero.attack++;
                if (vm.counter > vm.hero.special) {
                    vm.hero.special += Math.floor(Math.random());
                }
               alert(`You Leveled Up to ${vm.hero.level}. Your attack is ${vm.hero.attack}. Your max health is ${vm.hero.health}. Your special attack is ${vm.hero.special}.`);
            }
        }
        vm.attack = function() {
            let critchance = Math.floor(Math.random()*10)+1;
            if (vm.villain.health !== 0 && vm.hero.health !== 0) {
                if (vm.hero.health <= vm.villain.attack && vm.hero.health !== 0) {
                    vm.hero.health = 0;
                    return;
                }
                if (vm.villain.health < vm.hero.attack) {
                    vm.villain.health = 0;
                    vm.hero.health -= vm.villain.attack;
                }
                if (critchance === 1) {
                  alert("Your weapon strikes true!");
                   vm.villain.health -= vm.hero.attack + 1;
                   vm.hero.health -= vm.villain.attack;
                }
                else {
                    vm.villain.health -= vm.hero.attack;
                    vm.hero.health -= vm.villain.attack;
                }
            }
            vm.checkState();
        }
        vm.specialAttack = function() {
            if (vm.hero.mana >= 5) {
                if (vm.villain.health !==0 && vm.hero.health !==0) {
                    if(vm.villain.health < vm.hero.special) {
                        vm.villain.health = 0;
                        vm.hero.health -= vm.villain.attack;
                    }
                    else {
                        vm.hero.health -= vm.villain.attack;
                        vm.villain.health -= vm.hero.special;
                    }
                    vm.hero.mana -= 5;
                }
            }
            vm.checkState();
        }
        vm.useHPot = function() {
            if (vm.hero.hpot !== 0 && vm.hero.health !== 0) {
                vm.hero.health += (10 - vm.hero.health);
                vm.hero.hpot--;
            }
        }
        vm.useMPot = function() {
            if (vm.hero.hpot !== 10) {
                vm.hero.mpot--;
                vm.hero.mana += (10 - vm.hero.mana);
            }
        }
        vm.reviveVillain = function() {
            if (vm.villain.name === "Demon" && vm.villain.health <=0) {
                return;
            }
            if (vm.villain.health <= 0) {
                vm.villainCycle();
                vm.counter += 2;
               alert(`A hostile ${vm.villain.name} approaches!`)
            }
        }
    }]
};













angular.module("App").component("comp", comp);