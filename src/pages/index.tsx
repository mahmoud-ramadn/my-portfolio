import DomeGallery from "@/components/DomeGallery"
import SplitText from "@/components/SplitText"
import TextType from "@/components/TextType"

export default function Home() {
  const handleAnimationComplete = () => {
    console.log("All letters have animated!")
  }
  return (
    <div className=" flex flex-col items-center justify-center">
        <div className=" my-10 flex items-center   h-[500px] flex-col justify-center"> 

        <TextType
text={[
  "Hey there, friends! 😊",
  "Wishing you all a wonderful day!",
  "Stay happy and keep shining! ✨"
]}
          typingSpeed={75}
          pauseDuration={1500}
          className=" text-7xl font-semibold text-center"
          showCursor={true}
          cursorCharacter="|"
        />
        <SplitText
          text="Hello, there"
          className="text-8xl text-white font-semibold text-center"
          delay={100}
          duration={0.6}
          ease="power3.out"
          splitType="chars"
          from={{ opacity: 0, y: 40 }}
          to={{ opacity: 1, y: 0 }}
          threshold={0.1}
          rootMargin="-100px"
          textAlign="center"
          onLetterAnimationComplete={handleAnimationComplete}
        />

        </div>

        <div  style={{ width: '100vw', height: "50vh" }} className="  p-10 overflow-hidden rounded-full">
          <DomeGallery  segments={20} openedImageWidth="400px" openedImageHeight="400px" grayscale={false} />
        </div>
    </div>
  )
}
