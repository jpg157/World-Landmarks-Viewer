import { landmarkImageFileList } from "../../lib/landmarkImageFileList";
import LandmarkImageCarousel from "./landmarkImageCarousel/landmarkImageCarousel";
import ExploreLandmarksButton from "./exploreLandmarksButton";
import Footer from "../../../../../frontend/global/components/footer";
import HomeNavigationMenu from "../../../../../frontend/global/components/navigationMenu/homeNavigationMenu";

export const dynamic = 'force-static';

export default async function HomePageContainer() {

  return (
    <>
      <HomeNavigationMenu></HomeNavigationMenu>

      <main>
        <LandmarkImageCarousel {...landmarkImageFileList}></LandmarkImageCarousel>

        <div className={`
          flex items-center justify-center 
          my-6
          md:my-8
          `}
        >
          <h1 className={
            `
            inline-block 
            text-lg 
            md:text-4xl 
            roboto
            `
            }
          >
            Explore Historical Landmarks around the world!
          </h1>
        </div>

        <div className="flex justify-center">
          <ExploreLandmarksButton></ExploreLandmarksButton>
        </div>

      </main>

      <Footer fixedToBottomPosition={true}></Footer>
    </>
  );
}
