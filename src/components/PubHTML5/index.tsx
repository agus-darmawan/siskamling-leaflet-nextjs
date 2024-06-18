import React from "react";

const PubHtml5Embed: React.FC = () => {
  return (
    <div className="relative pb-[60.25%] h-0 overflow-hidden max-w-full bg-black rounded-lg">
      <iframe
        src="https://online.pubhtml5.com/szksj/rveu/"
        className="absolute top-0 left-0 w-full h-full border-none"
        allowFullScreen
        title="PubHTML5 Publication"
      ></iframe>
    </div>
  );
};

export default PubHtml5Embed;
