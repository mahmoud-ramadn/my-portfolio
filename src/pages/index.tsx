import TextType from "@/components/TextType"

export default function Home() {
  return (
    <>
      <div className=" flex items-center justify-center min-h-screen">
        <TextType
          text={["Hi, I'm Mahmoud Ramadan", "Front-End Developer", "Vue, Nuxt & React"]}
          typingSpeed={75}
          pauseDuration={1500}
          className=" text-7xl font-semibold text-center"
          showCursor={true}
          cursorCharacter="|"
        />
      </div>
    </>
  )
}
