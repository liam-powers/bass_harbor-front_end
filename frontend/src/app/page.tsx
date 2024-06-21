import PipelineButton from "./components/PipelineButton";

export default function Home() {
  return (
    <div>
      <div className="text-3xl">
        <div className="pb-10">I'm shopping for:</div>
        <div className="flex flex-row justify-center gap-20">
          <PipelineButton link={"./upright"}>Upright Basses</PipelineButton>
          <PipelineButton link={"./electric"}>Bass Guitars</PipelineButton>
        </div>

      </div>
    </div>
  )
}