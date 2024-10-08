function MapLocation() {
    return (
      <div className="flex flex-row items-center justify-center p-2">
        <iframe className="w-full "
          src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3886.681406403287!2d80.1966303!3d13.05594!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMTPCsDAzJzIxLjQiTiA4MMKwMTEnNDcuOSJF!5e0!3m2!1sen!2sin!4v1727202361514!5m2!1sen!2sin"
         
          height="400"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Shop Location"
        ></iframe>
      </div>
    );
  }
  
  export default MapLocation;
  