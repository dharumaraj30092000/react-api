import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Pagination } from "@mui/material";
import { Card } from "react-bootstrap";

const Api = () => {
  const count = 10;
  const initial = 1;
  const [page, setPage] = useState([]);
  const [state, setState] = useState([]);
  const [subState, setSubState] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://api.spacexdata.com/v3/launches")
      .then((res) => res.json())
      .then((json) => setState(json));
  }, []);

  useEffect(() => {
    const remain = state.length / count;
    const slice = 0 === page ? count - count : 10 * page + page;
    fetch(
      `https://api.spacexdata.com/v3/launches?limit=${remain}&offset=${slice}`
    )
      .then((response) => response.json())
      .then((json) => setSubState(json));
  }, [page]);

  let pageHandle = (event) => {
    setPage(
      parseInt(event.target.innerText) >= initial
        ? parseInt(event.target.innerText) - initial
        : null
    );
  };
  console.log("subSatate", subState);
  return (
    <div className="container">
      <div className="row">
        {subState.map((val, i) => {
          return (
            <div
              key={i}
              className="col-xl-4"
              style={{
                maxWidth: "600px",
                maxHeight: "1200px",
                textAlign: "center",
              }}
            >
              <Card
                style={{
                  border: "1px solid gray",
                  borderRadius: "5px",
                }}
              >
                <Card.Img
                  variant="top"
                  style={{ width: "100%" }}
                  src={
                    val.links.flickr_images.length > 0
                      ? `${val.links.flickr_images}`
                      : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRF7dPjbPeTQ6onJaqiNn2HJrvpGZCJxul8qA&usqp=CAU"
                  }
                />
                <Card.Body>
                  <Card.Title>{val.mission_name}</Card.Title>
                  <Card.Text>{val.details}</Card.Text>
                  <Button
                    style={{ margin: "0 10px" }}
                    variant="contained"
                    onClick={() =>
                      navigate(`/main/?number=${val.flight_number}`)
                    }
                  >
                    View Details
                  </Button>
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
                </Card.Body>
              </Card>
            </div>
          );
        })}
        <div className="m-5 d-flex justify-content-center">
          <Pagination count={10} onChange={pageHandle} color="primary" />
        </div>
      </div>
    </div>
  );
};

export default Api;
