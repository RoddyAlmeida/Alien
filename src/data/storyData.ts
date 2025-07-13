export interface StoryNode {
  id: string;
  content: string;
  options: StoryOption[];
  background?: string;
  artifacts?: string[];
}

export interface StoryOption {
  text: string;
  nextNodeId: string;
  consequence: 'help' | 'ignore' | 'deceive';
  relationshipChange: number; // -2 to 2
}

export const storyData: { [key: string]: StoryNode } = {
  'start': {
    id: 'start',
    content: 'Hola, soy Zhur. Estoy atrapado en una estación espacial abandonada. No recuerdo cómo llegué aquí. ¿Puedes ayudarme a encontrar una salida?',
    options: [
      {
        text: 'Sí, te ayudo a salir',
        nextNodeId: 'help_initial',
        consequence: 'help',
        relationshipChange: 1
      },
      {
        text: 'No, no es mi problema',
        nextNodeId: 'ignore_initial',
        consequence: 'ignore',
        relationshipChange: -1
      },
      {
        text: '¿Quién eres exactamente?',
        nextNodeId: 'question_identity',
        consequence: 'help',
        relationshipChange: 0
      }
    ]
  },

  'help_initial': {
    id: 'help_initial',
    content: '¡Gracias! Es extraño... mientras hablamos, empiezo a recordar algo sobre ti. ¿Has estado en el espacio antes?',
    options: [
      {
        text: 'No, nunca he salido de la Tierra',
        nextNodeId: 'memory_confusion',
        consequence: 'help',
        relationshipChange: 0
      },
      {
        text: '¿Qué quieres decir?',
        nextNodeId: 'suspicious_help',
        consequence: 'help',
        relationshipChange: 1
      },
      {
        text: 'Tal vez sí, pero no lo recuerdo',
        nextNodeId: 'shared_memory',
        consequence: 'help',
        relationshipChange: 2
      }
    ]
  },

  'memory_confusion': {
    id: 'memory_confusion',
    content: 'Interesante... pero hay algo en tu voz que me resulta familiar. ¿Estás seguro de que no hemos estado juntos en alguna misión?',
    options: [
      {
        text: 'No, estoy seguro',
        nextNodeId: 'help_initial',
        consequence: 'help',
        relationshipChange: 0
      },
      {
        text: 'Tal vez en otra vida',
        nextNodeId: 'shared_memory',
        consequence: 'help',
        relationshipChange: 1
      },
      {
        text: '¿Qué tipo de misión?',
        nextNodeId: 'question_identity',
        consequence: 'help',
        relationshipChange: 0
      }
    ]
  },

  'suspicious_help': {
    id: 'suspicious_help',
    content: 'No lo sé... pero mientras hablamos, veo imágenes. Una nave, un accidente... y tu rostro entre los escombros. ¿Recuerdas algo?',
    options: [
      {
        text: 'No recuerdo nada',
        nextNodeId: 'memory_confusion',
        consequence: 'help',
        relationshipChange: 0
      },
      {
        text: '¿Qué tipo de accidente?',
        nextNodeId: 'accident_details',
        consequence: 'help',
        relationshipChange: 1
      },
      {
        text: 'Tal vez sí, pero está borroso',
        nextNodeId: 'shared_memory',
        consequence: 'help',
        relationshipChange: 2
      }
    ]
  },

  'ignore_initial': {
    id: 'ignore_initial',
    content: 'Entiendo... pero hay algo en tu voz que me resulta familiar. ¿Estás seguro de que no nos conocemos?',
    options: [
      {
        text: 'No, definitivamente no',
        nextNodeId: 'final_abandon',
        consequence: 'ignore',
        relationshipChange: -2
      },
      {
        text: 'Tal vez... déjame pensar',
        nextNodeId: 'memory_hint',
        consequence: 'help',
        relationshipChange: 0
      },
      {
        text: '¿Por qué dices eso?',
        nextNodeId: 'suspicious_ignore',
        consequence: 'help',
        relationshipChange: -1
      }
    ]
  },

  'memory_hint': {
    id: 'memory_hint',
    content: 'Mientras piensas, veo más imágenes. Una nave llamada "Cartas del Espacio"... ¿Te suena familiar?',
    options: [
      {
        text: 'Sí, algo me suena',
        nextNodeId: 'shared_memory',
        consequence: 'help',
        relationshipChange: 1
      },
      {
        text: 'No, no me suena',
        nextNodeId: 'memory_confusion',
        consequence: 'help',
        relationshipChange: 0
      },
      {
        text: '¿Qué más recuerdas?',
        nextNodeId: 'accident_details',
        consequence: 'help',
        relationshipChange: 1
      }
    ]
  },

  'suspicious_ignore': {
    id: 'suspicious_ignore',
    content: 'Porque mientras hablamos, veo tu rostro en mis recuerdos. Estábamos juntos en una misión. ¿No recuerdas nada?',
    options: [
      {
        text: 'No, no recuerdo',
        nextNodeId: 'memory_confusion',
        consequence: 'help',
        relationshipChange: -1
      },
      {
        text: '¿Qué misión?',
        nextNodeId: 'question_identity',
        consequence: 'help',
        relationshipChange: 0
      },
      {
        text: 'Tal vez sí...',
        nextNodeId: 'shared_memory',
        consequence: 'help',
        relationshipChange: 1
      }
    ]
  },

  'question_identity': {
    id: 'question_identity',
    content: 'No lo sé... pero mientras hablamos, veo imágenes en mi mente. Una nave, un accidente... y tu rostro. ¿Eres real o solo un sueño?',
    options: [
      {
        text: 'Soy real, y quiero ayudarte',
        nextNodeId: 'reality_check',
        consequence: 'help',
        relationshipChange: 1
      },
      {
        text: 'Tal vez soy solo un sueño',
        nextNodeId: 'dream_reality',
        consequence: 'deceive',
        relationshipChange: 0
      },
      {
        text: '¿Qué tipo de accidente?',
        nextNodeId: 'accident_details',
        consequence: 'help',
        relationshipChange: 2
      }
    ]
  },

  'reality_check': {
    id: 'reality_check',
    content: 'Gracias... pero si eres real, ¿por qué no recuerdas la misión? ¿Por qué no recuerdas que estábamos juntos?',
    options: [
      {
        text: 'No lo sé, pero quiero ayudarte',
        nextNodeId: 'shared_memory',
        consequence: 'help',
        relationshipChange: 1
      },
      {
        text: 'Tal vez tengo amnesia',
        nextNodeId: 'memory_confusion',
        consequence: 'help',
        relationshipChange: 0
      },
      {
        text: '¿Qué misión?',
        nextNodeId: 'accident_details',
        consequence: 'help',
        relationshipChange: 0
      }
    ]
  },

  'dream_reality': {
    id: 'dream_reality',
    content: 'Si eres un sueño, entonces yo también lo soy. Pero si ambos somos sueños, ¿quién está soñando?',
    options: [
      {
        text: 'No lo sé, pero quiero ayudarte',
        nextNodeId: 'shared_memory',
        consequence: 'help',
        relationshipChange: 1
      },
      {
        text: 'Tal vez somos reales',
        nextNodeId: 'reality_check',
        consequence: 'help',
        relationshipChange: 0
      },
      {
        text: '¿Qué importa?',
        nextNodeId: 'final_abandon',
        consequence: 'ignore',
        relationshipChange: -1
      }
    ]
  },

  'accident_details': {
    id: 'accident_details',
    content: 'Fue durante la misión "Cartas del Espacio". Algo salió mal con el sistema de navegación. La nave se desintegró y nos separamos. ¿Recuerdas ahora?',
    options: [
      {
        text: 'Sí, algo me suena',
        nextNodeId: 'shared_memory',
        consequence: 'help',
        relationshipChange: 2
      },
      {
        text: 'No, pero quiero ayudarte',
        nextNodeId: 'mission_remembered',
        consequence: 'help',
        relationshipChange: 1
      },
      {
        text: '¿Qué pasó después?',
        nextNodeId: 'mission_remembered',
        consequence: 'help',
        relationshipChange: 1
      }
    ]
  },

  'shared_memory': {
    id: 'shared_memory',
    content: '¡Es verdad! Recuerdo ahora... estábamos en la misma nave. El accidente nos separó. ¿Recuerdas el nombre de la misión?',
    options: [
      {
        text: 'Cartas del Espacio',
        nextNodeId: 'mission_remembered',
        consequence: 'help',
        relationshipChange: 2
      },
      {
        text: 'No lo recuerdo',
        nextNodeId: 'partial_memory',
        consequence: 'help',
        relationshipChange: 1
      },
      {
        text: '¿Qué misión?',
        nextNodeId: 'confusion',
        consequence: 'ignore',
        relationshipChange: -1
      }
    ]
  },

  'partial_memory': {
    id: 'partial_memory',
    content: 'No importa, lo importante es que estamos juntos ahora. ¿Puedes ayudarme a encontrar las coordenadas de regreso a la Tierra?',
    options: [
      {
        text: 'Sí, busquemos juntos',
        nextNodeId: 'mission_remembered',
        consequence: 'help',
        relationshipChange: 1
      },
      {
        text: '¿Qué coordenadas?',
        nextNodeId: 'coordinates_search',
        consequence: 'help',
        relationshipChange: 0
      },
      {
        text: 'No sé cómo',
        nextNodeId: 'mission_remembered',
        consequence: 'help',
        relationshipChange: 0
      }
    ]
  },

  'confusion': {
    id: 'confusion',
    content: 'No entiendo... si no recuerdas la misión, ¿cómo llegaste aquí? ¿Cómo me encuentras?',
    options: [
      {
        text: 'No lo sé',
        nextNodeId: 'final_abandon',
        consequence: 'ignore',
        relationshipChange: -1
      },
      {
        text: 'Tal vez es destino',
        nextNodeId: 'shared_memory',
        consequence: 'help',
        relationshipChange: 1
      },
      {
        text: '¿Qué importa? Te ayudo',
        nextNodeId: 'mission_remembered',
        consequence: 'help',
        relationshipChange: 0
      }
    ]
  },

  'final_abandon': {
    id: 'final_abandon',
    content: 'Adiós entonces. Tal vez algún día recordarás la verdad sobre nosotros. La estación se desintegra...',
    options: [
      {
        text: 'Espera, no te vayas',
        nextNodeId: 'last_chance',
        consequence: 'help',
        relationshipChange: 1
      },
      {
        text: 'Lo siento',
        nextNodeId: 'ending_abandon',
        consequence: 'ignore',
        relationshipChange: -2
      }
    ]
  },

  'last_chance': {
    id: 'last_chance',
    content: '¿De verdad quieres ayudarme? ¿Aunque no recuerdes nada?',
    options: [
      {
        text: 'Sí, te ayudo',
        nextNodeId: 'mission_remembered',
        consequence: 'help',
        relationshipChange: 2
      },
      {
        text: 'No lo sé',
        nextNodeId: 'ending_abandon',
        consequence: 'ignore',
        relationshipChange: -1
      }
    ]
  },

  'mission_remembered': {
    id: 'mission_remembered',
    content: '¡Exacto! Cartas del Espacio. La misión para establecer comunicación interestelar. Pero algo salió mal... ¿Puedes ayudarme a encontrar las coordenadas de regreso?',
    options: [
      {
        text: 'Sí, busquemos juntos',
        nextNodeId: 'ending_success',
        consequence: 'help',
        relationshipChange: 2
      },
      {
        text: '¿Qué coordenadas?',
        nextNodeId: 'coordinates_search',
        consequence: 'help',
        relationshipChange: 1
      }
    ]
  },

  'coordinates_search': {
    id: 'coordinates_search',
    content: 'Las coordenadas de la Tierra. Están en el sistema de navegación de la estación. ¿Puedes ayudarme a acceder a ellas?',
    options: [
      {
        text: 'Sí, vamos a buscarlas',
        nextNodeId: 'ending_success',
        consequence: 'help',
        relationshipChange: 2
      },
      {
        text: '¿Dónde está el sistema?',
        nextNodeId: 'ending_success',
        consequence: 'help',
        relationshipChange: 1
      },
      {
        text: 'No sé cómo',
        nextNodeId: 'ending_success',
        consequence: 'help',
        relationshipChange: 0
      }
    ]
  },

  'ending_success': {
    id: 'ending_success',
    content: '¡Las encontré! Gracias por no abandonarme. Juntos logramos recordar. La nave de rescate está en camino. Nos vemos en casa, compañero.',
    options: [
      {
        text: 'Nos vemos pronto',
        nextNodeId: 'credits',
        consequence: 'help',
        relationshipChange: 2
      }
    ]
  },

  'ending_abandon': {
    id: 'ending_abandon',
    content: 'La estación se desintegra en el vacío. Zhur se pierde para siempre en el espacio. Algunas conexiones nunca se establecen...',
    options: [
      {
        text: 'Reiniciar',
        nextNodeId: 'start',
        consequence: 'ignore',
        relationshipChange: 0
      }
    ]
  },

  'credits': {
    id: 'credits',
    content: 'FIN - Has ayudado a Zhur a recordar y regresar a casa. La amistad interestelar triunfa.',
    options: [
      {
        text: 'Jugar de nuevo',
        nextNodeId: 'start',
        consequence: 'help',
        relationshipChange: 0
      }
    ]
  }
};

export const getStoryNode = (nodeId: string): StoryNode | null => {
  return storyData[nodeId] || null;
};

export const getNextNode = (currentNodeId: string, optionIndex: number): StoryNode | null => {
  const currentNode = storyData[currentNodeId];
  if (!currentNode || !currentNode.options[optionIndex]) {
    return null;
  }
  
  const nextNodeId = currentNode.options[optionIndex].nextNodeId;
  return storyData[nextNodeId] || null;
}; 