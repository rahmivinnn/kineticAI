"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import {
  Home,
  Activity,
  Users,
  MessageSquare,
  BarChart2,
  FileText,
  User,
  Settings,
  Camera,
  Video,
  VideoOff,
  Mic,
  MicOff,
  PhoneOff,
  Download,
  Upload,
  Maximize2,
  Minimize2,
  Play,
  Pause,
  RotateCcw,
  Share2,
  LogOut,
} from "lucide-react"
import { useAuth } from "@/components/auth-provider"
import { VideoCall } from "@/components/video-call"

export default function PoseEstimationPage() {
  const { user, logout } = useAuth()
  const [activeTab, setActiveTab] = useState("live")
  const [isVideoOn, setIsVideoOn] = useState(false)
  const [isRecording, setIsRecording] = useState(false)
  const [showSkeleton, setShowSkeleton] = useState(true)
  const [show3D, setShow3D] = useState(false)
  const [showAugmentation, setShowAugmentation] = useState(false)
  const [selectedAugmentation, setSelectedAugmentation] = useState("none")
  const [isVideoCallActive, setIsVideoCallActive] = useState(false)
  const [isVideoCallMinimized, setIsVideoCallMinimized] = useState(false)
  const [detectionQuality, setDetectionQuality] = useState(75)
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isModelLoaded, setIsModelLoaded] = useState(false)
  const [isModelLoading, setIsModelLoading] = useState(false)
  const [fps, setFps] = useState(0)
  const [poseData, setPoseData] = useState<any>(null)

  // Start webcam
  const startWebcam = async () => {
    try {
      setIsModelLoading(true)
      const stream = await navigator.mediaDevices.getUserMedia({ video: true })
      if (videoRef.current) {
        videoRef.current.srcObject = stream
        videoRef.current.onloadedmetadata = () => {
          videoRef.current?.play()
          setIsVideoOn(true)
          
          // Simulate model loading
          setTimeout(() => {
            setIsModelLoaded(true)
            setIsModelLoading(false)
            startPoseDetection()
          }, 2000)
        }
      }
    } catch (error) {
      console.error("Error accessing webcam:", error)
      setIsModelLoading(false)
    }
  }

  // Stop webcam
  const stopWebcam = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream
      const tracks = stream.getTracks()
      tracks.forEach(track => track.stop())
      videoRef.current.srcObject = null
      setIsVideoOn(false)
    }
  }

  // Toggle recording
  const toggleRecording = () => {
    setIsRecording(!isRecording)
  }

  // Start pose detection
  const startPoseDetection = () => {
    // In a real implementation, this would initialize OpenPose
    // For demo purposes, we'll simulate pose detection with random data
    const poseDetectionInterval = setInterval(() => {
      if (!isVideoOn) {
        clearInterval(poseDetectionInterval)
        return
      }

      // Simulate FPS
      setFps(Math.floor(Math.random() * 10) + 20)

      // Draw to canvas
      if (canvasRef.current && videoRef.current) {
        const ctx = canvasRef.current.getContext('2d')
        if (ctx) {
          // Match canvas size to video
          canvasRef.current.width = videoRef.current.videoWidth
          canvasRef.current.height = videoRef.current.videoHeight
          
          // Draw video frame
          ctx.drawImage(videoRef.current, 0, 0)
          
          if (showSkeleton) {
            // Draw skeleton (simplified for demo)
            drawSkeleton(ctx)
          }
        }
      }
    }, 1000 / 30) // Target 30 FPS

    return () => clearInterval(poseDetectionInterval)
  }

  // Draw skeleton on canvas
  const drawSkeleton = (ctx: CanvasRenderingContext2D) => {
    if (!canvasRef.current) return
    
    const width = canvasRef.current.width
    const height = canvasRef.current.height
    
    // Generate random keypoints for demo
    const keypoints = [
      { x: width * 0.5, y: height * 0.1 }, // head
      { x: width * 0.5, y: height * 0.3 }, // neck
      { x: width * 0.4, y: height * 0.4 }, // left shoulder
      { x: width * 0.6, y: height * 0.4 }, // right shoulder
      { x: width * 0.3, y: height * 0.6 }, // left elbow
      { x: width * 0.7, y: height * 0.6 }, // right elbow
      { x: width * 0.25, y: height * 0.75 }, // left wrist
      { x: width * 0.75, y: height * 0.75 }, // right wrist
      { x: width * 0.5, y: height * 0.5 }, // torso
      { x: width * 0.45, y: height * 0.7 }, // left hip
      { x: width * 0.55, y: height * 0.7 }, // right hip
      { x: width * 0.4, y: height * 0.85 }, // left knee
      { x: width * 0.6, y: height * 0.85 }, // right knee
      { x: width * 0.35, y: height * 0.95 }, // left ankle
      { x: width * 0.65, y: height * 0.95 }, // right ankle
    ]
    
    // Draw keypoints
    ctx.fillStyle = '#00ff00'
    keypoints.forEach(point => {
      ctx.beginPath()
      ctx.arc(point.x, point.y, 5, 0, 2 * Math.PI)
      ctx.fill()
    })
    
    // Draw connections
    ctx.strokeStyle = '#00ff00'
    ctx.lineWidth = 2
    
    // Head to neck
    ctx.beginPath()
    ctx.moveTo(keypoints[0].x, keypoints[0].y)
    ctx.lineTo(keypoints[1].x, keypoints[1].y)
    ctx.stroke()
    
    // Neck to shoulders
    ctx.beginPath()
    ctx.moveTo(keypoints[1].x, keypoints[1].y)
    ctx.lineTo(keypoints[2].x, keypoints[2].y)
    ctx.stroke()
    
    ctx.beginPath()
    ctx.moveTo(keypoints[1].x, keypoints[1].y)
    ctx.lineTo(keypoints[3].x, keypoints[3].y)
    ctx.stroke()
    
    // Shoulders to elbows
    ctx.beginPath()
    ctx.moveTo(keypoints[2].x, keypoints[2].y)
    ctx.lineTo(keypoints[4].x, keypoints[4].y)
    ctx.stroke()
    
    ctx.beginPath()
    ctx.moveTo(keypoints[3].x, keypoints[3].y)
    ctx.lineTo(keypoints[5].x, keypoints[5].y)
    ctx.stroke()
    
    // Elbows to wrists
    ctx.beginPath()
    ctx.moveTo(keypoints[4].x, keypoints[4].y)
    ctx.lineTo(keypoints[6].x, keypoints[6].y)
    ctx.stroke()
    
    ctx.beginPath()
    ctx.moveTo(keypoints[5].x, keypoints[5].y)
    ctx.lineTo(keypoints[7].x, keypoints[7].y)
    ctx.stroke()
    
    // Neck to torso
    ctx.beginPath()
    ctx.moveTo(keypoints[1].x, keypoints[1].y)
    ctx.lineTo(keypoints[8].x, keypoints[8].y)
    ctx.stroke()
    
    // Torso to hips
    ctx.beginPath()
    ctx.moveTo(keypoints[8].x, keypoints[8].y)
    ctx.lineTo(keypoints[9].x, keypoints[9].y)
    ctx.stroke()
    
    ctx.beginPath()
    ctx.moveTo(keypoints[8].x, keypoints[8].y)
    ctx.lineTo(keypoints[10].x, keypoints[10].y)
    ctx.stroke()
    
    // Hips to knees
    ctx.beginPath()
    ctx.moveTo(keypoints[9].x, keypoints[9].y)
    ctx.lineTo(keypoints[11].x, keypoints[11].y)
    ctx.stroke()
    
    ctx.beginPath()
    ctx.moveTo(keypoints[10].x, keypoints[10].y)
    ctx.lineTo(keypoints[12].x, keypoints[12].y)
    ctx.stroke()
    
    // Knees to ankles
    ctx.beginPath()
    ctx.moveTo(keypoints[11].x, keypoints[11].y)
    ctx.lineTo(keypoints[13].x, keypoints[13].y)
    ctx.stroke()
    
    ctx.beginPath()
    ctx.moveTo(keypoints[12].x, keypoints[12].y)
    ctx.lineTo(keypoints[14].x, keypoints[14].y)
    ctx.stroke()
    
    // Store pose data for analysis
    setPoseData(keypoints)
  }

  // Start video call
  const startVideoCall = () => {
    setIsVideoCallActive(true)
  }

  // End video call
  const endVideoCall = () => {
    setIsVideoCallActive(false)
    setIsVideoCallMinimized(false)
  }

  // Toggle video call minimized state
  const toggleVideoCallMinimized = () => {
    setIsVideoCallMinimized(!isVideoCallMinimized)
  }

  // Clean up on unmount
  useEffect(() => {
    return () => {
      stopWebcam()
    }
  }, [])

  return (
    <div className="flex h-screen bg-[#f0f4f9]">
      {/* Sidebar */}
      <div className="w-[78px] bg-gradient-to-b from-[#001a41] to-[#003366] flex flex-col items-center py-6">
        <div className="mb-8">
          <Image src="/blue-wave-logo.png" alt="Kinetic Logo" width={60} height={60} />
          <span className="text-white text-xs font-bold mt-1 block text-center">KINETIC</span>
        </div>

        <nav className="flex flex-col items-center space-y-6 flex-1">
          <Link
            href="/dashboard"
            className="w-10 h-10 rounded-xl hover:bg-white/10 flex items-center justify-center text-white"
          >
            <Home className="w-5 h-5" />
          </Link>
          <Link
            href="/exercises"
            className="w-10 h-10 rounded-xl hover:bg-white/10 flex items-center justify-center text-white"
          >
            <Activity className="w-5 h-5" />
          </Link>
          <Link
            href="/appointments"
            className="w-10 h-10 rounded-xl hover:bg-white/10 flex items-center justify-center text-white"
          >
            <Users className="w-5 h-5" />
          </Link>
          <Link
            href="/messages"
            className="w-10 h-10 rounded-xl hover:bg-white/10 flex items-center justify-center text-white"
          >
            <MessageSquare className="w-5 h-5" />
          </Link>
          <Link
            href="/progress"
            className="w-10 h-10 rounded-xl hover:bg-white/10 flex items-center justify-center text-white"
          >
            <BarChart2 className="w-5 h-5" />
          </Link>
          <Link
            href="/video-library"
            className="w-10 h-10 rounded-xl hover:bg-white/10 flex items-center justify-center text-white"
          >
            <FileText className="w-5 h-5" />
          </Link>
          <Link
            href="/pose-estimation"
            className="w-10 h-10 rounded-xl bg-[#7e58f4] bg-opacity-20 flex items-center justify-center text-white"
          >
            <Camera className="w-5 h-5" />
          </Link>
        </nav>

        <div className="mt-auto flex flex-col items-center space-y-6">
          <Link
            href="/profile"
            className="w-10 h-10 rounded-xl hover:bg-white/10 flex items-center justify-center text-white"
          >
            <User className="w-5 h-5" />
          </Link>
          <Link
            href="/settings"
            className="w-10 h-10 rounded-xl hover:bg-white/10 flex items-center justify-center text-white"
          >
            <Settings className="w-5 h-5" />
          </Link>
          <button
            onClick={logout}
            className="w-10 h-10 rounded-xl hover:bg-white/10 flex items-center justify-center text-white"
          >
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-2xl font-bold text-[#111827]">Motion Analysis & Pose Estimation</h1>
              <p className="text-gray-500">Real-time movement tracking and analysis powered by OpenPose</p>
            </div>
            <Button 
              onClick={startVideoCall} 
              className="bg-[#014585] hover:bg-[#013a70]"
              disabled={isVideoCallActive}
            >
              <Video className="mr-2 h-4 w-4" />
              Start Video Call
            </Button>
          </div>

          <Tabs defaultValue="live" className="mb-6" onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3 mb-4">
              <TabsTrigger value="live">Live Analysis</TabsTrigger>
              <TabsTrigger value="recorded">Recorded Sessions</TabsTrigger>
              <TabsTrigger value="exercises">Guided Exercises</TabsTrigger>
            </TabsList>
            <TabsContent value="live" className="space-y-4">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <Card className="overflow-hidden">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-center">
                        <CardTitle>Real-time Pose Estimation</CardTitle>
                        <div className="flex items-center space-x-2">
                          {isModelLoaded && isVideoOn && (
                            <span className="text-sm text-green-500 flex items-center">
                              <span className="h-2 w-2 bg-green-500 rounded-full mr-1"></span>
                              {fps} FPS
                            </span>
                          )}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="p-0 relative">
                      <div className="relative aspect-video bg-black flex items-center justify-center">
                        {!isVideoOn ? (
                          <div className="text-center">
                            <Camera className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                            <p className="text-gray-400 mb-4">Camera is turned off</p>
                            <Button onClick={startWebcam} className="bg-[#014585] hover:bg-[#013a70]">
                              Start Camera
                            </Button>
                          </div>
                        ) : (
                          <>
                            <video
                              ref={videoRef}
                              className="w-full h-full object-contain"
                              muted
                              playsInline
                            />
                            <canvas
                              ref={canvasRef}
                              className="absolute inset-0 w-full h-full"
                            />
                            {isModelLoading && (
                              <div className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center">
                                <div className="w-16 h-16 border-4 border-t-blue-500 border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin mb-4"></div>
                                <p className="text-white">Loading OpenPose model...</p>
                              </div>
                            )}
                          </>
                        )}
                      </div>
                      <div className="p-4 bg-gray-50 flex justify-between items-center">
                        <div className="flex space-x-2">
                          {isVideoOn ? (
                            <Button onClick={stopWebcam} variant="outline" size="sm" className="text-red-500">
                              <VideoOff className="h-4 w-4 mr-1" /> Stop Camera
                            </Button>
                          ) : (
                            <Button onClick={startWebcam} variant="outline" size="sm">
                              <Video className="h-4 w-4 mr-1" /> Start Camera
                            </Button>
                          )}
                          <Button
                            onClick={toggleRecording}
                            variant="outline"
                            size="sm"
                            disabled={!isVideoOn}
                            className={isRecording ? "text-red-500" : ""}
                          >
                            {isRecording ? (
                              <>
                                <Pause className="h-4 w-4 mr-1" /> Stop Recording
                              </>
                            ) : (
                              <>
                                <Play className="h-4 w-4 mr-1" /> Record
                              </>
                            )}
                          </Button>
                        </div>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm" disabled={!isVideoOn}>
                            <Download className="h-4 w-4 mr-1" /> Save Data
                          </Button>
                          <Button variant="outline" size="sm" disabled={!isVideoOn}>
                            <Share2 className="h-4 w-4 mr-1" /> Share
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                <div>
                  <div className="space-y-6">
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle>Detection Settings</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <Label htmlFor="quality">Detection Quality</Label>
                            <span className="text-sm text-gray-500">{detectionQuality}%</span>
                          </div>
                          <Slider
                            id="quality"
                            defaultValue={[75]}
                            max={100}
                            step={5}
                            onValueChange={(value) => setDetectionQuality(value[0])}
                            disabled={!isVideoOn}
                          />
                        </div>
                        
                        <div className="space-y-4 pt-2">
                          <div className="flex items-center justify-between">
                            <Label htmlFor="skeleton">Show Skeleton</Label>
                            <Switch
                              id="skeleton"
                              checked={showSkeleton}
                              onCheckedChange={setShowSkeleton}
                              disabled={!isVideoOn}
                            />
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <Label htmlFor="3d">3D Visualization</Label>
                            <Switch
                              id="3d"
                              checked={show3D}
                              onCheckedChange={setShow3D}
                              disabled={!isVideoOn}
                            />
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <Label htmlFor="augmentation">Augmentation</Label>
                            <Switch
                              id="augmentation"
                              checked={showAugmentation}
                              onCheckedChange={setShowAugmentation}
                              disabled={!isVideoOn}
                            />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle>Analysis</CardTitle>
                      </CardHeader>
                      <CardContent>
                        {isModelLoaded && isVideoOn ? (
                          <div className="space-y-3">
                            <div>
                              <h3 className="text-sm font-medium">Posture Score</h3>
                              <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                                <div className="bg-green-500 h-2 rounded-full" style={{ width: '85%' }}></div>
                              </div>
                              <div className="flex justify-between mt-1">
                                <span className="text-xs text-gray-500">Score</span>
                                <span className="text-xs font-medium">85/100</span>
                              </div>
                            </div>
                            
                            <div>
                              <h3 className="text-sm font-medium">Movement Accuracy</h3>
                              <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                                <div className="bg-blue-500 h-2 rounded-full" style={{ width: '72%' }}></div>
                              </div>
                              <div className="flex justify-between mt-1">
                                <span className="text-xs text-gray-500">Accuracy</span>
                                <span className="text-xs font-medium">72%</span>
                              </div>
                            </div>
                            
                            <div>
                              <h3 className="text-sm font-medium">Range of Motion</h3>
                              <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                                <div className="bg-purple-500 h-2 rounded-full" style={{ width: '68%' }}></div>
                              </div>
                              <div className="flex justify-between mt-1">
                                <span className="text-xs text-gray-500">ROM</span>
                                <span className="text-xs font-medium">68%</span>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div className="text-center py-6 text-gray-500">
                            <p>Start camera to view analysis</p>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="recorded">
              <Card>
                <CardHeader>
                  <CardTitle>Recorded Sessions</CardTitle>
                  <CardDescription>View and analyze your previous sessions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12">
                    <p className="text-gray-500 mb-4">No recorded sessions yet</p>
                    <Button className="bg-[#014585] hover:bg-[#013a70]">
                      <Upload className="mr-2 h-4 w-4" /> Upload Recording
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="exercises">
              <Card>
                <CardHeader>
                  <CardTitle>Guided Exercise Programs</CardTitle>
                  <CardDescription>Follow along with guided exercise routines</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg">Shoulder Mobility</CardTitle>
                      </CardHeader>
                      <CardContent className="pt-2">
                        <div className="aspect-video bg-gray-100 rounded-md mb-3 flex items-center justify-center">
                          <Play className="h-8 w-8 text-gray-400" />
                        </div>
                        <p className="text-sm text-gray-600 mb-3">
                          Improve shoulder range of motion with guided exercises
                        </p>
                        <Button className="w-full bg-[#014585] hover:bg-[#013a70]">Start Program</Button>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg">Knee Stability</CardTitle>
                      </CardHeader>
                      <CardContent className="pt-2">
                        <div className="aspect-video bg-gray-100 rounded-md mb-3 flex items-center justify-center">
                          <Play className="h-8 w-8 text-gray-400" />
                        </div>
                        <p className="text-sm text-gray-600 mb-3">
                          Strengthen knee stability with targeted exercises
                        </p>
                        <Button className="w-full bg-[#014585] hover:bg-[#013a70]">Start Program</Button>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg">Core Strength</CardTitle>
                      </CardHeader>
                      <CardContent className="pt-2">
                        <div className="aspect-video bg-gray-100 rounded-md mb-3 flex items-center justify-center">
                          <Play className="h-8 w-8 text-gray-400" />
                        </div>
                        <p className="text-sm text-gray-600 mb-3">
                          Build core strength and stability with guided routines
                        </p>
                        <Button className="w-full bg-[#014585] hover:bg-[#013a70]">Start Program</Button>
                      </CardContent>
                    </Card>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
      
      {/* Video Call Component */}
      {isVideoCallActive && (
        <VideoCall
          therapistName="Dr. Rebecca Chen"
          therapistImage="/caring-doctor.png"
          onEndCall={endVideoCall}
          isMinimized={isVideoCallMinimized}
          onToggleMinimize={toggleVideoCallMinimized}
        />
      )}
    </div>
  )
}
