import React from "react";
import Title from "../../Title";

export default function EmprtyCart() {
  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-10 mx-auto text-center text-title">
          <Title name="Basket is" title=" empty" />
        </div>
      </div>
    </div>
  );
}
