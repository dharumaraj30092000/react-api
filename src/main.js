import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Slider from "react-slick";
import "./main.scss";
import { Button } from "@mui/material";

const link = [
  "https://upload.wikimedia.org/wikipedia/commons/1/14/Proton_Zvezda_crop.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/2/2b/Apollo_15_launch.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/6/60/Mrm7669_Launch_of_SSLV-D1_from_Satish_Dhawan_FLP.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/9/94/Soyuz_TMA-3_launch.jpg",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRF7dPjbPeTQ6onJaqiNn2HJrvpGZCJxul8qA&usqp=CAU",
];
const Main = () => {
  const [state, setState] = useState([]);
  const [number] = useSearchParams();
  const settings = {
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1500,
    pauseOnHover: true,
  };
  useEffect(() => {
    fetch(
      `https://api.spacexdata.com/v3/launches/${parseInt(number.get("number"))}`
    )
      .then((response) => response.json())
      .then((json) => setState([json]));
  }, [number]);
  return (
    <div className="container">
      {state?.map((val, i) => {
        return (
          <div
            key={i}
            className="text-center"
            style={{ width: "100%", height: "auto" }}
          >
            <p className="fs-2">{val.mission_name}</p>
            <Slider {...settings}>
              {val.links.flickr_images.length > 0
                ? val.links.flickr_images.map((val, i) => {
                    console.log(val);
                    return (
                      <div key={i}>
                        <div
                          style={{
                            backgroundImage: `url(${val})`,
                            backgroundRepeat: "no-repeat",
                            backgroundPosition: "center",
                            backgroundAttachment: "fixed",
                            width: "100vw",
                            height: "100vh",
                          }}
                        ></div>
                      </div>
                    );
                  })
                : link.map((val, i) => {
                    return (
                      <div key={i}>
                        <div
                          style={{
                            backgroundImage: `url(${val})`,
                            backgroundRepeat: "no-repeat",
                            backgroundPosition: "center",
                            backgroundAttachment: "fixed",
                            backgroundSize: "size",
                            width: "100vw",
                            heigth: "100vh",
                          }}
                        ></div>
                      </div>
                    );
                  })}
            </Slider>
            <Button variant="contained">
              <a
                style={{
                  textDecoration: "none",
                  display: "block",
                  color: "white",
                }}
                href={
                  val.links.wikipedia
                    ? `${val.links.wikipedia}`
                    : "https://en.wikipedia.org/wiki/Rocket"
                }
                target="new_blank"
              >
                link
              </a>
            </Button>
          </div>
        );
      })}
    </div>
  );
};

export default Main;
