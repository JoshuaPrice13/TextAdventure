const textElement = document.getElementById('text')
const optionButtonsElement = document.getElementById('option-buttons')

let state = {}

function startGame() {
  state = {}
  showTextNode(1)
}

function showTextNode(textNodeIndex) {
  const textNode = textNodes.find(textNode => textNode.id === textNodeIndex)
  textElement.innerText = textNode.text
  while (optionButtonsElement.firstChild) {
    optionButtonsElement.removeChild(optionButtonsElement.firstChild)
  }

  textNode.options.forEach(option => {
    if (showOption(option)) {
      const button = document.createElement('button')
      button.innerText = option.text
      button.classList.add('btn')
      button.addEventListener('click', () => selectOption(option))
      optionButtonsElement.appendChild(button)
    }
  })
}

function showOption(option) {
  return option.requiredState == null || option.requiredState(state)
}

function selectOption(option) {
  const nextTextNodeId = option.nextText
  if (nextTextNodeId <= 0) {
    return startGame()
  }
  state = Object.assign(state, option.setState)
  showTextNode(nextTextNodeId)
}

const textNodes = [
  {
    id: 1,
    text: 'You wake up to find yourself stranded on a small boat in the middle of the Ocean with only a paddle. You see a fish sitting on the edge of the boat within arms reach. ',
    options: [
      {
        text: 'Grab the fish',
        setState: { fish: true },
        nextText: 2
      },
      {
        text: 'Push it back in the water',
        nextText: 2
      }
    ]
  },
  {
    id: 2,
    text: 'A mermaid comes out of the water and tells you of her powers, and her hunger, and can help you with a trade.',
    options: [
      {
        text: 'Trade the fish for a sail',
        requiredState: (currentState) => currentState.fish,
        setState: { fish: false, sail: true },
        nextText: 3
      },
      {
        text: "Trade the fish for a gun",
        requiredState: (currentState) => currentState.fish,
        setState: { fish: false, gun: true },
        nextText: 3
      },
      {
        text: "Kick her off of your boat",
        nextText: 3
      }
    ]
  },
  {
    id: 3,
    text: 'You see somthing in the far distance, but are very tired from your day at sea',
    options: [
      {
        text: 'Get some rest',
        nextText: 4
      },
      {
        text: 'Sail into the Unknown',
        requiredState: (currentState) => currentState.sail,
        nextText: 5
      },
      {
        text: "Paddle away from the unknown",
        nextText: 6
      },
      {
        text: 'Paddle towards the unknown',
        nextText: 7
      }
    ]
  },
  {
    id: 4,
    text: 'You wake up shipwrecked on an inhabited island, inhabited by dragons! They eat you within minutes.',
    options: [
      {
        text: 'Restart',
        nextText: -1
      }
    ]
  },
  {
    id: 5,
    text: 'You get closer to realize that it is a storm! The wind picks up, and your sail carries you right in, straight to your death.',
    options: [
      {
        text: 'Restart',
        nextText: -1
      }
    ]
  },
  {
    id: 6,
    text: 'You paddle further into the void of the sea, and eventually die of starvation',
    options: [
      {
        text: 'Restart',
        nextText: -1
      }
    ]
  },
  {
    id: 7,
    text: 'You can almost see it...',
    options: [
      {
        text: 'Keep paddling',
        nextText: 8
      }
    ]
  },
  {
    id: 8,
    text: "It's... a... STORM! But just as you are aproching it, a sea monster rises out of the water!",
    options: [
      {
        text: 'Paddle away!!!',
        nextText: 9
      },
      {
        text: 'Shoot it with your gun',
        requiredState: (currentState) => currentState.gun,
        nextText: 10
      },
      {
        text: 'Lower your sail as a sign of peace',
        requiredState: (currentState) => currentState.sail,
        nextText: 11
      },
      {
        text: 'Throw the fish at it',
        requiredState: (currentState) => currentState.fish,
        nextText: 12
      }
    ]
  },
  {
    id: 9,
    text: 'Your attempts to flee are in vain and the monster easily catches you.',
    options: [
      {
        text: 'Restart',
        nextText: -1
      }
    ]
  },
  {
    id: 10,
    text: 'You foolishly thought this monster could be slain with a gun.',
    options: [
      {
        text: 'Restart',
        nextText: -1
      }
    ]
  },
  {
    id: 11,
    text: 'The monster laughed as you lowered your sail and ate you.',
    options: [
      {
        text: 'Restart',
        nextText: -1
      }
    ]
  },
  {
    id: 12,
    text: 'The moster catches the fish in his mouth! Seemingly pleased with the snack, he befriends you. You live out the rest of your days with your large best friend, who supllies you with food and happiness',
    options: [
      {
        text: 'Congratulations. Play Again.',
        nextText: -1
      }
    ]
  }
]

startGame()