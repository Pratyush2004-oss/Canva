import Image from "next/image";
import PreTemplateList from "../_components/PreTemplateList";
import AddToTemplateDialog from "../_components/AddToTemplateDialog";

function Templates() {
  return (
    <div className="w-full p-10">
      <div className="relative">
        <Image
          src={"/banner-home.png"}
          alt="banner"
          width={1000}
          height={"300"}
          className="w-full h-[200px] rounded-2xl object-cover"
        />
        <h2 className="text-3xl absolute bottom-5 left-10 text-white font-bold text-shadow">
          Templates
        </h2>
      </div>
      <div className="my-7 flex items-center justify-between px-5">
        <h2 className="text-2xl font-bold">Templates</h2>
        <AddToTemplateDialog/>
      </div>
      <PreTemplateList />
    </div>
  );
}

export default Templates;
