export type ExerciseCategory = {
  id: string
  name: string
  description: string
  imageUrl: string
  count: number
}

export type Exercise = {
  id: string
  name: string
  category: string
  difficulty: "Beginner" | "Intermediate" | "Advanced"
  targetAreas: string[]
  description: string
  instructions: string[]
  imageUrl: string
  videoUrl?: string
  duration: string
  repetitions?: string
  sets?: string
  equipment?: string[]
  precautions?: string[]
  variations?: {
    name: string
    description: string
  }[]
  benefits: string[]
}

// Exercise Categories
export const exerciseCategories: ExerciseCategory[] = [
  {
    id: "knee-rehab",
    name: "Knee Rehabilitation",
    description: "Exercises tailored for knee recovery",
    imageUrl: "/wall-slide-exercise.png",
    count: 12,
  },
  {
    id: "lower-back",
    name: "Lower Back",
    description: "Exercises to improve lower back mobility",
    imageUrl: "/bridge-exercise.png",
    count: 8,
  },
  {
    id: "posture",
    name: "Posture Correction",
    description: "Exercises for better alignment",
    imageUrl: "/bird-dog-exercise.png",
    count: 5,
  },
  {
    id: "strength",
    name: "Strength Training",
    description: "Build muscle strength and endurance",
    imageUrl: "/bicep-curl-exercise.png",
    count: 12,
  },
  {
    id: "flexibility",
    name: "Flexibility & Stretching",
    description: "Improve range of motion and prevent injury",
    imageUrl: "/hamstring-stretch.png",
    count: 10,
  },
  {
    id: "balance",
    name: "Balance & Stability",
    description: "Enhance coordination and prevent falls",
    imageUrl: "/balance-exercise.png",
    count: 8,
  },
  {
    id: "shoulder",
    name: "Shoulder Mobility",
    description: "Improve shoulder range of motion",
    imageUrl: "/shoulder-exercise.png",
    count: 9,
  },
  {
    id: "cardio",
    name: "Cardiovascular",
    description: "Improve heart health and endurance",
    imageUrl: "/recovery-analytics.jpg",
    count: 6,
  },
]

// Sample exercises for each category
export const exercises: Record<string, Exercise[]> = {
  "knee-rehab": [
    {
      id: "knee-1",
      name: "Seated Knee Extensions",
      category: "knee-rehab",
      difficulty: "Beginner",
      targetAreas: ["Quadriceps", "Knee joint"],
      description: "A simple exercise to strengthen the quadriceps muscles which support the knee.",
      instructions: [
        "Sit on a chair with your back straight and feet flat on the floor",
        "Slowly extend one leg until it's straight, keeping the foot flexed",
        "Hold for 3-5 seconds",
        "Slowly lower the leg back to the starting position",
        "Repeat with the other leg",
      ],
      imageUrl: "/wall-slide-exercise.png",
      duration: "5 min",
      repetitions: "10",
      sets: "3",
      precautions: ["Avoid locking the knee at full extension", "Stop if you feel pain (not just discomfort)"],
      benefits: [
        "Strengthens quadriceps muscles",
        "Improves knee stability",
        "Helps reduce knee pain",
        "Supports recovery after knee injury or surgery",
      ],
    },
    {
      id: "knee-2",
      name: "Standing Hamstring Curls",
      category: "knee-rehab",
      difficulty: "Beginner",
      targetAreas: ["Hamstrings", "Knee joint"],
      description: "An exercise that targets the hamstring muscles to improve knee stability and function.",
      instructions: [
        "Stand facing a wall or chair for support if needed",
        "Shift your weight to one leg",
        "Slowly bend the other knee, bringing your heel toward your buttocks",
        "Hold for 3-5 seconds",
        "Slowly lower the leg back to the starting position",
        "Repeat with the other leg",
      ],
      imageUrl: "/heel-raises-exercise.png",
      duration: "8 min",
      repetitions: "12",
      sets: "3",
      precautions: ["Maintain proper posture throughout the exercise", "Avoid overextending the knee"],
      benefits: [
        "Strengthens hamstring muscles",
        "Improves knee flexibility",
        "Enhances balance and coordination",
        "Supports overall knee function",
      ],
    },
    {
      id: "knee-3",
      name: "Wall Slides",
      category: "knee-rehab",
      difficulty: "Intermediate",
      targetAreas: ["Quadriceps", "Hamstrings", "Glutes"],
      description: "A controlled squat variation that strengthens the muscles supporting the knee.",
      instructions: [
        "Stand with your back against a wall, feet shoulder-width apart and about 1-2 feet from the wall",
        "Slowly slide down the wall until your knees are bent at about 45 degrees",
        "Hold for 5-10 seconds",
        "Slowly slide back up to the starting position",
      ],
      imageUrl: "/wall-slide-exercise.png",
      duration: "7 min",
      repetitions: "8",
      sets: "3",
      precautions: ["Don't slide down too far if you feel knee pain", "Keep your knees aligned with your feet"],
      benefits: [
        "Strengthens multiple leg muscles simultaneously",
        "Improves knee stability",
        "Enhances functional movement patterns",
        "Low impact on knee joints",
      ],
    },
  ],
  "lower-back": [
    {
      id: "back-1",
      name: "Pelvic Tilts",
      category: "lower-back",
      difficulty: "Beginner",
      targetAreas: ["Lower back", "Abdominals"],
      description: "A gentle exercise that helps mobilize the lower back and strengthen core muscles.",
      instructions: [
        "Lie on your back with knees bent and feet flat on the floor",
        "Flatten your lower back against the floor by tightening your abdominal muscles and tilting your pelvis",
        "Hold for 5 seconds",
        "Release and return to the starting position",
      ],
      imageUrl: "/pelvic-tilt-exercise.png",
      duration: "5 min",
      repetitions: "10",
      sets: "3",
      precautions: ["Avoid arching your back", "Keep movements slow and controlled"],
      benefits: [
        "Relieves lower back tension",
        "Strengthens core muscles",
        "Improves pelvic awareness",
        "Helps establish neutral spine position",
      ],
    },
    {
      id: "back-2",
      name: "Bridges",
      category: "lower-back",
      difficulty: "Beginner",
      targetAreas: ["Lower back", "Glutes", "Hamstrings"],
      description: "An exercise that strengthens the posterior chain muscles which support the lower back.",
      instructions: [
        "Lie on your back with knees bent and feet flat on the floor",
        "Tighten your abdominal and gluteal muscles",
        "Lift your hips off the floor until your body forms a straight line from shoulders to knees",
        "Hold for 5-10 seconds",
        "Slowly lower back to the starting position",
      ],
      imageUrl: "/bridge-exercise.png",
      duration: "7 min",
      repetitions: "12",
      sets: "3",
      precautions: ["Avoid overarching the lower back", "Keep movements controlled"],
      benefits: [
        "Strengthens glutes and hamstrings",
        "Improves core stability",
        "Reduces lower back pain",
        "Enhances pelvic stability",
      ],
    },
    {
      id: "back-3",
      name: "Bird Dog",
      category: "lower-back",
      difficulty: "Intermediate",
      targetAreas: ["Lower back", "Core", "Shoulders", "Glutes"],
      description: "A stabilization exercise that improves core strength and spinal alignment.",
      instructions: [
        "Start on your hands and knees in a tabletop position",
        "Extend your right arm forward and left leg backward simultaneously",
        "Keep your spine neutral and core engaged",
        "Hold for 5 seconds",
        "Return to the starting position",
        "Repeat with the left arm and right leg",
      ],
      imageUrl: "/bird-dog-exercise.png",
      duration: "8 min",
      repetitions: "10 each side",
      sets: "3",
      precautions: ["Maintain a neutral spine", "Avoid rotating the hips or shoulders"],
      benefits: [
        "Improves core stability",
        "Enhances balance and coordination",
        "Strengthens back extensors",
        "Promotes proper spinal alignment",
      ],
    },
  ],
  posture: [
    {
      id: "posture-1",
      name: "Chin Tucks",
      category: "posture",
      difficulty: "Beginner",
      targetAreas: ["Neck", "Upper back"],
      description: "A simple exercise to improve neck alignment and reduce forward head posture.",
      instructions: [
        "Sit or stand with your spine tall",
        "Without tilting your head, gently draw your chin back, creating a 'double chin'",
        "Hold for 5 seconds",
        "Relax and return to the starting position",
      ],
      imageUrl: "/bird-dog-exercise.png",
      duration: "4 min",
      repetitions: "10",
      sets: "3",
      precautions: ["Keep the movement gentle", "Don't tilt your head up or down"],
      benefits: [
        "Improves neck alignment",
        "Reduces forward head posture",
        "Relieves upper back tension",
        "Helps prevent neck pain",
      ],
    },
    // More exercises would be added for each category
  ],
  strength: [
    {
      id: "str-1",
      name: "Resistance Band Bicep Curls",
      category: "strength",
      difficulty: "Beginner",
      targetAreas: ["Biceps", "Forearms"],
      description: "A simple yet effective exercise to strengthen the biceps using resistance bands.",
      instructions: [
        "Stand with feet shoulder-width apart on the middle of the resistance band",
        "Hold the ends of the band with palms facing forward",
        "Keep elbows close to your sides",
        "Curl your hands toward your shoulders while keeping your upper arms stationary",
        "Slowly return to the starting position",
      ],
      imageUrl: "/bicep-curl-exercise.png",
      duration: "30-45 seconds",
      repetitions: "12",
      sets: "3",
      equipment: ["Resistance band"],
      precautions: ["Avoid swinging or using momentum", "Keep wrists straight throughout the movement"],
      benefits: [
        "Increases bicep strength",
        "Improves grip strength",
        "Enhances arm function for daily activities",
        "Provides resistance throughout the full range of motion",
      ],
    },
  ],
  flexibility: [
    {
      id: "flex-1",
      name: "Seated Hamstring Stretch",
      category: "flexibility",
      difficulty: "Beginner",
      targetAreas: ["Hamstrings", "Lower back"],
      description: "A gentle stretch for the hamstrings that can be performed while seated.",
      instructions: [
        "Sit on the edge of a chair with one leg extended forward, heel on the floor",
        "Keep your back straight and chest lifted",
        "Hinge forward from your hips until you feel a stretch in the back of your extended leg",
        "Hold the position for the recommended duration",
        "Return to starting position and repeat with the other leg",
      ],
      imageUrl: "/hamstring-stretch.png",
      duration: "30 seconds per side",
      equipment: ["Chair (optional)"],
      precautions: ["Avoid bouncing", "Stop if you feel pain (not just stretching)"],
      benefits: [
        "Increases hamstring flexibility",
        "Reduces risk of lower back pain",
        "Improves posture",
        "Enhances overall mobility",
      ],
    },
  ],
  balance: [
    {
      id: "bal-1",
      name: "Single Leg Stand",
      category: "balance",
      difficulty: "Beginner",
      targetAreas: ["Ankles", "Core", "Legs"],
      description: "A fundamental balance exercise that strengthens the stabilizing muscles.",
      instructions: [
        "Stand with feet hip-width apart near a counter or sturdy chair for support if needed",
        "Shift your weight to one foot and slowly lift the other foot off the ground",
        "Hold the position, keeping your hips level and core engaged",
        "Lower your foot and repeat on the other side",
      ],
      imageUrl: "/balance-exercise.png",
      duration: "15-30 seconds per side",
      sets: "2-3",
      precautions: ["Have support nearby if balance is severely compromised", "Avoid if experiencing dizziness"],
      benefits: [
        "Improves balance and stability",
        "Strengthens ankle muscles",
        "Enhances proprioception",
        "Reduces fall risk",
      ],
    },
  ],
  shoulder: [
    {
      id: "shoulder-1",
      name: "Shoulder Rotation",
      category: "shoulder",
      difficulty: "Beginner",
      targetAreas: ["Rotator cuff", "Shoulder joint"],
      description: "An exercise to improve shoulder mobility and strengthen the rotator cuff muscles.",
      instructions: [
        "Stand with feet shoulder-width apart",
        "Bend your elbows to 90 degrees and keep them close to your sides",
        "Rotate your forearms outward, keeping elbows fixed",
        "Slowly return to the starting position",
      ],
      imageUrl: "/shoulder-exercise.png",
      duration: "5 min",
      repetitions: "12",
      sets: "3",
      precautions: ["Keep movements slow and controlled", "Avoid shrugging your shoulders"],
      benefits: [
        "Strengthens rotator cuff muscles",
        "Improves shoulder stability",
        "Enhances shoulder mobility",
        "Helps prevent shoulder injuries",
      ],
    },
  ],
  // Additional categories would be populated similarly
}

// Function to get all exercises
export function getAllExercises(): Exercise[] {
  return Object.values(exercises).flat()
}

// Function to get exercise by ID
export function getExerciseById(id: string): Exercise | undefined {
  return getAllExercises().find((exercise) => exercise.id === id)
}

// Function to get exercises by category
export function getExercisesByCategory(categoryId: string): Exercise[] {
  return exercises[categoryId] || []
}

// Function to search exercises
export function searchExercises(query: string): Exercise[] {
  const lowercaseQuery = query.toLowerCase()
  return getAllExercises().filter(
    (exercise) =>
      exercise.name.toLowerCase().includes(lowercaseQuery) ||
      exercise.description.toLowerCase().includes(lowercaseQuery) ||
      exercise.targetAreas.some((area) => area.toLowerCase().includes(lowercaseQuery)),
  )
}
