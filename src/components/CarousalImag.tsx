import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import Link from "next/link";
import Image from "next/image";

interface IimagData {
  imgData: string[] | null;
}
const CarousalImage = ({ imgData }: IimagData) => {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);
  const [imgArray, setImgArray] = useState<string[] | null>(null);
  React.useEffect(() => {
    if (!api) {
      return;
    }
    setImgArray(imgData);
    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <div className="w-full text-center">
      <Carousel
        setApi={setApi}
        className="relative flex items-center flex-col gap-1 my-2"
      >
        <CarouselContent className="">
          {imgArray &&
            Array.from(imgArray).map((img, index) => (
              <CarouselItem key={index}>
                <Card className="border-none">
                  <CardContent>
                    <Link href={img} target="_blanck">
                      <Image
                        width={500}
                        height={500}
                        src={img}
                        alt="image"
                        className="w-full max-h-48 object-cover rounded-2xl"
                      />
                    </Link>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
        </CarouselContent>
        <div className=" relative py-2 text-center text-sm text-muted-foreground">
          Slide {current} of {imgArray?.length} {}
          <CarouselPrevious className="absolute" />
          <CarouselNext />
        </div>
      </Carousel>
    </div>
  );
};

export default CarousalImage;
