function MapLocation() {
  return (
    <>
      <div className="flex flex-row items-center justify-center p-2 w-[95%] mx-auto ">
        <iframe
          className="w-full rounded-2xl shadow-lg"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3886.6814724726755!2d80.19664200000001!3d13.055935800000004!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a52677f1d275c4b%3A0xc2eb73ca5ff3af78!2sThe%20Miladys%20Pastries!5e0!3m2!1sen!2sin!4v1729006100167!5m2!1sen!2sin"
          height="400"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Shop Location"
        ></iframe>
      </div>
     
    </>
  );
}

export default MapLocation;
