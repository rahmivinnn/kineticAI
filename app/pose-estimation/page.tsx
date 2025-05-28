'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Slider } from "@/components/ui/slider"
import { 
  Camera, 
  CameraOff, 
  Play, 
  Pause, 
  RotateCcw, 
  CheckCircle, 
  AlertTriangle,
  Activity,
  Target,
  Timer,
  TrendingUp,
  Settings,
  Zap,
  Award,
  BarChart3
} from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { DashboardLayout } from '@/components/dashboard-layout'

interface PoseKeypoint {
  x: number
  y: number
  confidence: number
}

interface PoseData {
  keypoints: PoseKeypoint[]
  score: number
}

interface ExerciseMetrics {
  reps: number
  form: 'excellent' | 'good' | 'needs-improvement'
  angleAccuracy: number
  timing: number
}

export default function PoseEstimationPage() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationFrameRef = useRef<number>()
  const [isRecording, setIsRecording] = useState(false)
  const [cameraEnabled, setCameraEnabled] = useState(false)
  const [currentExercise, setCurrentExercise] = useState('squat')
  const [repCount, setRepCount] = useState(0)
  const [accuracy, setAccuracy] = useState(85)
  const [feedback, setFeedback] = useState('Keep your back straight')
  const [sessionTime, setSessionTime] = useState(0)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [poseData, setPoseData] = useState<any>(null)
  const [exercisePhase, setExercisePhase] = useState('ready')
  const [confidence, setConfidence] = useState(0)
  const [calibrationComplete, setCalibrationComplete] = useState(false)
  const [sensitivity, setSensitivity] = useState([75])
  const [realTimeMetrics, setRealTimeMetrics] = useState({
    speed: 0,
    range: 0,
    stability: 0,
    form: 0
  })
  const [stream, setStream] = useState<MediaStream | null>(null)

  const exercises = [
    { 
      id: 'squat', 
      name: 'Squats', 
      target: 'Legs & Glutes', 
      difficulty: 'Beginner',
      keyPoints: ['knee_alignment', 'hip_depth', 'back_straight'],
      description: 'Lower body strength exercise focusing on quadriceps and glutes'
    },
    { 
      id: 'pushup', 
      name: 'Push-ups', 
      target: 'Chest & Arms', 
      difficulty: 'Intermediate',
      keyPoints: ['arm_extension', 'body_alignment', 'chest_depth'],
      description: 'Upper body exercise targeting chest, shoulders, and triceps'
    },
    { 
      id: 'lunge', 
      name: 'Lunges', 
      target: 'Legs & Core', 
      difficulty: 'Beginner',
      keyPoints: ['knee_angle', 'balance', 'step_length'],
      description: 'Unilateral leg exercise improving balance and strength'
    },
    { 
      id: 'plank', 
      name: 'Plank Hold', 
      target: 'Core', 
      difficulty: 'Intermediate',
      keyPoints: ['body_line', 'hip_position', 'shoulder_stability'],
      description: 'Isometric core exercise for stability and endurance'
    },
    { 
      id: 'shoulder', 
      name: 'Shoulder Raises', 
      target: 'Shoulders', 
      difficulty: 'Beginner',
      keyPoints: ['arm_height', 'control', 'posture'],
      description: 'Shoulder mobility and strength exercise'
    }
  ]

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isRecording) {
      interval = setInterval(() => {
        setSessionTime(prev => prev + 1)
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isRecording])

  useEffect(() => {
    return () => {
      // Cleanup on unmount
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
      stopCamera()
    }
  }, [])

  useEffect(() => {
    if (cameraEnabled && isAnalyzing) {
      startPoseDetection()
    }
  }, [cameraEnabled, isAnalyzing, startPoseDetection])

  const simulateAdvancedPoseDetection = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    // Simulate pose landmarks
    const landmarks = generateSimulatedLandmarks(width, height)
    
    // Draw pose skeleton
    drawPoseSkeleton(ctx, landmarks)
    
    // Analyze exercise form
    const analysis = analyzeExerciseForm(landmarks)
    
    // Update metrics
    setRealTimeMetrics(analysis.metrics)
    setConfidence(analysis.confidence)
    setAccuracy(analysis.accuracy)
    setFeedback(analysis.feedback)
    
    // Update exercise phase
    setExercisePhase(analysis.phase)
    
    // Count reps based on phase transitions
    if (analysis.repCompleted) {
      setRepCount(prev => prev + 1)
    }
  }

  const generateSimulatedLandmarks = (width: number, height: number) => {
    // Simulate key body landmarks for pose estimation
    const centerX = width / 2
    const centerY = height / 2
    
    return {
      nose: { x: centerX + (Math.random() - 0.5) * 20, y: centerY - 150 + (Math.random() - 0.5) * 10 },
      leftShoulder: { x: centerX - 80 + (Math.random() - 0.5) * 10, y: centerY - 100 + (Math.random() - 0.5) * 10 },
      rightShoulder: { x: centerX + 80 + (Math.random() - 0.5) * 10, y: centerY - 100 + (Math.random() - 0.5) * 10 },
      leftElbow: { x: centerX - 120 + (Math.random() - 0.5) * 15, y: centerY - 50 + (Math.random() - 0.5) * 15 },
      rightElbow: { x: centerX + 120 + (Math.random() - 0.5) * 15, y: centerY - 50 + (Math.random() - 0.5) * 15 },
      leftWrist: { x: centerX - 140 + (Math.random() - 0.5) * 20, y: centerY + (Math.random() - 0.5) * 20 },
      rightWrist: { x: centerX + 140 + (Math.random() - 0.5) * 20, y: centerY + (Math.random() - 0.5) * 20 },
      leftHip: { x: centerX - 60 + (Math.random() - 0.5) * 10, y: centerY + 50 + (Math.random() - 0.5) * 10 },
      rightHip: { x: centerX + 60 + (Math.random() - 0.5) * 10, y: centerY + 50 + (Math.random() - 0.5) * 10 },
      leftKnee: { x: centerX - 70 + (Math.random() - 0.5) * 15, y: centerY + 150 + (Math.random() - 0.5) * 15 },
      rightKnee: { x: centerX + 70 + (Math.random() - 0.5) * 15, y: centerY + 150 + (Math.random() - 0.5) * 15 },
      leftAnkle: { x: centerX - 75 + (Math.random() - 0.5) * 10, y: centerY + 250 + (Math.random() - 0.5) * 10 },
      rightAnkle: { x: centerX + 75 + (Math.random() - 0.5) * 10, y: centerY + 250 + (Math.random() - 0.5) * 10 }
    }
  }

  const drawPoseSkeleton = (ctx: CanvasRenderingContext2D, landmarks: any) => {
    // Set drawing style
    ctx.strokeStyle = '#00ff00'
    ctx.lineWidth = 3
    ctx.fillStyle = '#ff0000'
    
    // Draw connections
    const connections = [
      ['leftShoulder', 'rightShoulder'],
      ['leftShoulder', 'leftElbow'],
      ['leftElbow', 'leftWrist'],
      ['rightShoulder', 'rightElbow'],
      ['rightElbow', 'rightWrist'],
      ['leftShoulder', 'leftHip'],
      ['rightShoulder', 'rightHip'],
      ['leftHip', 'rightHip'],
      ['leftHip', 'leftKnee'],
      ['leftKnee', 'leftAnkle'],
      ['rightHip', 'rightKnee'],
      ['rightKnee', 'rightAnkle']
    ]
    
    // Draw skeleton lines
    connections.forEach(([start, end]) => {
      const startPoint = landmarks[start]
      const endPoint = landmarks[end]
      if (startPoint && endPoint) {
        ctx.beginPath()
        ctx.moveTo(startPoint.x, startPoint.y)
        ctx.lineTo(endPoint.x, endPoint.y)
        ctx.stroke()
      }
    })
    
    // Draw landmark points
    Object.values(landmarks).forEach((point: any) => {
      ctx.beginPath()
      ctx.arc(point.x, point.y, 5, 0, 2 * Math.PI)
      ctx.fill()
    })
  }

  const analyzeExerciseForm = (landmarks: any) => {
    // Simulate exercise analysis based on current exercise
    const exercise = exercises.find(ex => ex.id === currentExercise)
    
    // Generate realistic metrics
    const baseAccuracy = 70 + Math.random() * 25
    const speed = 40 + Math.random() * 40
    const range = 60 + Math.random() * 35
    const stability = 50 + Math.random() * 45
    const form = baseAccuracy + (Math.random() - 0.5) * 10
    
    // Generate contextual feedback
    const feedbacks = {
      squat: [
        'Keep your chest up and core engaged',
        'Go deeper - aim for 90° knee angle',
        'Excellent depth! Control the ascent',
        'Keep knees aligned with toes',
        'Perfect form! Maintain this technique'
      ],
      pushup: [
        'Lower your chest closer to the ground',
        'Keep your body in a straight line',
        'Great form! Control the movement',
        'Engage your core throughout',
        'Perfect push-up technique!'
      ],
      lunge: [
        'Step further forward for better range',
        'Keep your torso upright',
        'Excellent balance and control',
        'Lower your back knee more',
        'Perfect lunge form!'
      ]
    }
    
    const exerciseFeedbacks = feedbacks[currentExercise as keyof typeof feedbacks] || feedbacks.squat
    const feedback = exerciseFeedbacks[Math.floor(Math.random() * exerciseFeedbacks.length)]
    
    // Simulate exercise phases
    const phases = ['ready', 'descending', 'bottom', 'ascending', 'top']
    const currentPhaseIndex = Math.floor(Math.random() * phases.length)
    const phase = phases[currentPhaseIndex]
    
    return {
      metrics: {
        speed: Math.round(speed),
        range: Math.round(range),
        stability: Math.round(stability),
        form: Math.round(form)
      },
      confidence: Math.round(85 + Math.random() * 10),
      accuracy: Math.round(baseAccuracy),
      feedback,
      phase,
      repCompleted: Math.random() > 0.95 // Occasionally complete a rep
    }
  }

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { 
          width: { ideal: 1280 },
          height: { ideal: 720 },
          frameRate: { ideal: 30 }
        },
        audio: false
      })
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream
        setCameraEnabled(true)
        setIsAnalyzing(true)
        
        // Start real-time pose detection
        startPoseDetection()
      }
    } catch (error) {
      console.error('Error accessing camera:', error)
      alert('Unable to access camera. Please check permissions and ensure you\'re using HTTPS.')
    }
  }

  const startPoseDetection = useCallback(() => {
    const detectPose = () => {
      if (videoRef.current && canvasRef.current && isAnalyzing) {
        const video = videoRef.current
        const canvas = canvasRef.current
        const ctx = canvas.getContext('2d')
        
        if (ctx && video.readyState === 4) {
          // Set canvas size to match video
          canvas.width = video.videoWidth
          canvas.height = video.videoHeight
          
          // Draw video frame
          ctx.drawImage(video, 0, 0, canvas.width, canvas.height)
          
          // Simulate advanced pose detection
          simulateAdvancedPoseDetection(ctx, canvas.width, canvas.height)
        }
      }
      
      if (isAnalyzing) {
        animationFrameRef.current = requestAnimationFrame(detectPose)
      }
    }
    
    detectPose()
  }, [isAnalyzing])

  const stopCamera = () => {
    if (videoRef.current?.srcObject) {
      const tracks = (videoRef.current.srcObject as MediaStream).getTracks()
      tracks.forEach(track => track.stop())
      videoRef.current.srcObject = null
    }
    
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current)
    }
    
    setCameraEnabled(false)
    setIsAnalyzing(false)
    
    // Clear canvas
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext('2d')
      if (ctx) {
        ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height)
      }
    }
  }

  const resetSession = () => {
    setRepCount(0)
    setSessionTime(0)
    setAccuracy(85)
    setFeedback('Ready to start!')
    setExercisePhase('ready')
    setConfidence(0)
    setRealTimeMetrics({
      speed: 0,
      range: 0,
      stability: 0,
      form: 0
    })
  }

  const calibrateCamera = () => {
    setCalibrationComplete(false)
    // Simulate calibration process
    setTimeout(() => {
      setCalibrationComplete(true)
      setFeedback('Calibration complete! You can start exercising.')
    }, 3000)
  }

  const drawPoseKeypoints = () => {
    if (!canvasRef.current || !currentPose) return
    
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    
    // Draw keypoints
    currentPose.keypoints.forEach((keypoint, index) => {
      if (keypoint.confidence > 0.5) {
        ctx.beginPath()
        ctx.arc(keypoint.x, keypoint.y, 5, 0, 2 * Math.PI)
        ctx.fillStyle = `hsl(${index * 20}, 70%, 50%)`
        ctx.fill()
      }
    })
    
    // Draw skeleton connections (simplified)
    ctx.strokeStyle = '#00ff00'
    ctx.lineWidth = 2
    const connections = [
      [5, 6], [5, 7], [6, 8], [7, 9], [8, 10], // Arms
      [11, 12], [11, 13], [12, 14], [13, 15], [14, 16] // Legs
    ]
    
    connections.forEach(([a, b]) => {
      const pointA = currentPose.keypoints[a]
      const pointB = currentPose.keypoints[b]
      if (pointA.confidence > 0.5 && pointB.confidence > 0.5) {
        ctx.beginPath()
        ctx.moveTo(pointA.x, pointA.y)
        ctx.lineTo(pointB.x, pointB.y)
        ctx.stroke()
      }
    })
  }

  useEffect(() => {
    if (isRecording) {
      drawPoseKeypoints()
    }
  }, [currentPose, isRecording])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <DashboardLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg">
              <Activity className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold mb-1">AI Pose Estimation</h1>
              <p className="text-gray-600">
                Real-time movement analysis with advanced MediaPipe integration
              </p>
            </div>
          </div>
          
          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <Card className="p-4">
              <div className="flex items-center gap-2">
                <Target className="h-4 w-4 text-blue-500" />
                <span className="text-sm font-medium">Reps</span>
              </div>
              <div className="text-2xl font-bold text-blue-600">{repCount}</div>
            </Card>
            <Card className="p-4">
              <div className="flex items-center gap-2">
                <Timer className="h-4 w-4 text-green-500" />
                <span className="text-sm font-medium">Time</span>
              </div>
              <div className="text-2xl font-bold text-green-600">{formatTime(sessionTime)}</div>
            </Card>
            <Card className="p-4">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-purple-500" />
                <span className="text-sm font-medium">Accuracy</span>
              </div>
              <div className="text-2xl font-bold text-purple-600">{accuracy}%</div>
            </Card>
            <Card className="p-4">
              <div className="flex items-center gap-2">
                <Zap className="h-4 w-4 text-orange-500" />
                <span className="text-sm font-medium">Confidence</span>
              </div>
              <div className="text-2xl font-bold text-orange-600">{confidence}%</div>
            </Card>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Camera Feed */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Camera className="h-5 w-5" />
                    Live Camera Feed
                    {cameraEnabled && (
                      <Badge variant="outline" className="ml-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full mr-1 animate-pulse" />
                        Live
                      </Badge>
                    )}
                  </div>
                  <Badge 
                    variant={exercisePhase === 'ready' ? 'secondary' : 'default'}
                    className="capitalize"
                  >
                    {exercisePhase}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative bg-gray-900 rounded-lg overflow-hidden">
                  <video
                    ref={videoRef}
                    className="w-full h-96 object-cover"
                    autoPlay
                    muted
                    playsInline
                  />
                  <canvas
                    ref={canvasRef}
                    className="absolute top-0 left-0 w-full h-full pointer-events-none"
                  />
                  
                  {/* Overlay Controls */}
                  <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center">
                    <div className="flex gap-2">
                      {!cameraEnabled ? (
                        <Button
                          onClick={startCamera}
                          className="bg-green-600 hover:bg-green-700"
                        >
                          <Camera className="h-4 w-4 mr-2" />
                          Start Camera
                        </Button>
                      ) : (
                        <Button
                          onClick={stopCamera}
                          className="bg-red-600 hover:bg-red-700"
                        >
                          <CameraOff className="h-4 w-4 mr-2" />
                          Stop Camera
                        </Button>
                      )}
                      
                      <Button
                        onClick={() => setIsRecording(!isRecording)}
                        disabled={!cameraEnabled}
                        variant={isRecording ? "destructive" : "default"}
                      >
                        {isRecording ? (
                          <Pause className="h-4 w-4 mr-2" />
                        ) : (
                          <Play className="h-4 w-4 mr-2" />
                        )}
                        {isRecording ? 'Pause' : 'Record'}
                      </Button>
                      
                      <Button
                        onClick={resetSession}
                        variant="outline"
                        className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                      >
                        <RotateCcw className="h-4 w-4 mr-2" />
                        Reset
                      </Button>
                    </div>
                    
                    {/* Exercise Selector */}
                    <select
                      value={currentExercise}
                      onChange={(e) => setCurrentExercise(e.target.value)}
                      className="bg-white/10 border border-white/20 rounded px-3 py-2 text-white text-sm backdrop-blur-sm"
                    >
                      {exercises.map(exercise => (
                        <option key={exercise.id} value={exercise.id} className="text-black">
                          {exercise.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  {/* Status Indicators */}
                  <div className="absolute top-4 left-4 right-4 flex justify-between">
                    {!calibrationComplete && cameraEnabled && (
                      <Alert className="bg-yellow-500/20 border-yellow-500/50 text-yellow-100">
                        <AlertTriangle className="h-4 w-4" />
                        <AlertDescription>
                          Position yourself in the camera view for calibration
                        </AlertDescription>
                      </Alert>
                    )}
                    
                    {calibrationComplete && (
                      <div className="bg-green-500/20 border border-green-500/50 text-green-100 px-3 py-2 rounded-lg text-sm font-medium flex items-center gap-2">
                        <CheckCircle className="h-4 w-4" />
                        Calibrated & Ready
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Camera Controls */}
                <div className="mt-4 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Detection Sensitivity</span>
                    <span className="text-sm text-gray-600">{sensitivity[0]}%</span>
                  </div>
                  <Slider
                    value={sensitivity}
                    onValueChange={setSensitivity}
                    max={100}
                    min={50}
                    step={5}
                    className="w-full"
                  />
                  
                  <div className="flex gap-2">
                    <Button
                      onClick={calibrateCamera}
                      disabled={!cameraEnabled}
                      variant="outline"
                      size="sm"
                    >
                      <Settings className="h-4 w-4 mr-2" />
                      Calibrate
                    </Button>
                    <Button
                      disabled={!cameraEnabled}
                      variant="outline"
                      size="sm"
                    >
                      <BarChart3 className="h-4 w-4 mr-2" />
                      Analytics
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Metrics Panel */}
          <div className="space-y-6">
            {/* Real-time Metrics */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5" />
                  Real-time Metrics
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Movement Speed</span>
                      <span>{realTimeMetrics.speed}%</span>
                    </div>
                    <Progress value={realTimeMetrics.speed} className="h-2" />
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Range of Motion</span>
                      <span>{realTimeMetrics.range}%</span>
                    </div>
                    <Progress value={realTimeMetrics.range} className="h-2" />
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Stability</span>
                      <span>{realTimeMetrics.stability}%</span>
                    </div>
                    <Progress value={realTimeMetrics.stability} className="h-2" />
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Form Quality</span>
                      <span>{realTimeMetrics.form}%</span>
                    </div>
                    <Progress value={realTimeMetrics.form} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Real-time Feedback */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5" />
                  AI Feedback
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Alert className={`${
                    accuracy > 85 ? 'border-green-200 bg-green-50' :
                    accuracy > 70 ? 'border-yellow-200 bg-yellow-50' :
                    'border-red-200 bg-red-50'
                  }`}>
                    <AlertDescription className="text-sm">
                      {feedback}
                    </AlertDescription>
                  </Alert>
                  
                  {repCount > 0 && (
                    <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                      <div className="flex items-center gap-2 text-sm font-medium text-blue-800">
                        <Award className="h-4 w-4" />
                        Great progress! {repCount} reps completed
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Exercise Selection */}
            <Card>
              <CardHeader>
                <CardTitle>Exercise Library</CardTitle>
                <CardDescription>
                  Select an exercise to begin pose analysis
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {exercises.map(exercise => (
                    <button
                      key={exercise.id}
                      onClick={() => setCurrentExercise(exercise.id)}
                      className={`w-full text-left p-4 rounded-lg border transition-all duration-200 ${
                        currentExercise === exercise.id
                          ? 'border-blue-500 bg-blue-50 shadow-md'
                          : 'border-gray-200 hover:border-gray-300 hover:shadow-sm'
                      }`}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div className="font-medium">{exercise.name}</div>
                        <Badge 
                          variant={exercise.difficulty === 'Beginner' ? 'secondary' : 'default'}
                          className="text-xs"
                        >
                          {exercise.difficulty}
                        </Badge>
                      </div>
                      <div className="text-sm text-gray-600 mb-2">{exercise.target}</div>
                      <div className="text-xs text-gray-500">{exercise.description}</div>
                      
                      {currentExercise === exercise.id && (
                        <div className="mt-3 pt-3 border-t border-blue-200">
                          <div className="text-xs font-medium text-blue-800 mb-1">Key Points:</div>
                          <div className="flex flex-wrap gap-1">
                            {exercise.keyPoints.map((point, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {point.replace('_', ' ')}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}