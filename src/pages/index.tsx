import DomeGallery from "@/components/DomeGallery"
import SplitText from "@/components/SplitText"
import TextType from "@/components/TextType"

export default function Home() {

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="my-6 sm:my-10 flex items-center absolute top-3 gap-y-12 sm:gap-y-24 z-50 left-1/2 -translate-x-1/2 h-auto sm:h-[500px] flex-col justify-center px-4">
        <TextType
          text={["Hey there, friends! 😊", "Wishing you all a wonderful day!", "Stay happy and keep shining! ✨"]}
          typingSpeed={75}
          pauseDuration={1500}
          className="text-2xl sm:text-4xl md:text-5xl lg:text-7xl font-semibold text-center"
          showCursor={true}
          cursorCharacter="|"
        />
        <SplitText
          text="Hello, There"
          className="text-2xl sm:text-4xl md:text-5xl lg:text-8xl text-white font-semibold text-center"
          delay={100}
          duration={0.6}
          ease="power3.out"
          splitType="chars"
          from={{ opacity: 0, y: 40 }}
          to={{ opacity: 1, y: 0 }}
          threshold={0.1}
          rootMargin="-100px"
          textAlign="center"
        />
      </div>

      <div className="w-full h-screen rounded-full">
        <DomeGallery 
          segments={20}  
          openedImageWidth="280px" 
          minRadius={200} 
          openedImageHeight="280px" 
          grayscale={false}  
        />
      </div>
    </div>
  )
}
