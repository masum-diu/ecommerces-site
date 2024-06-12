export default async function handler(req, res) {
  const {
    accountNumber,
    originCountryCode,
    originCityName,
    destinationCountryCode,
    destinationCityName,
    weight,
    length,
    width,
    height,
    plannedShippingDate,
    isCustomsDeclarable,
    unitOfMeasurement,
  } = req.query;

  //   const { header } = req.header;
  const url = `https://express.api.dhl.com/mydhlapi/rates?accountNumber=${accountNumber}&originCountryCode=${originCountryCode}&originCityName=${originCityName}&destinationCountryCode=${destinationCountryCode}&destinationCityName=${destinationCityName}&weight=${weight}&length=${length}&width=${width}&height=${height}&plannedShippingDate=${plannedShippingDate}&isCustomsDeclarable=${isCustomsDeclarable}&unitOfMeasurement=${unitOfMeasurement}`;
  const username = "apN6lU7mN2iX9s";
  const password = "S^9zQ!3aF^0mI@3v";

  const generateUniqueId = () => {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let id = "";

    for (let i = 0; i < 36; i++) {
      if (i === 8 || i === 13 || i === 18 || i === 23) {
        id += "-";
      } else {
        id += characters.charAt(Math.floor(Math.random() * characters.length));
      }
    }

    return id;
  };

  // Inside your useEffect or wherever needed
  const messageReference = generateUniqueId();
  const todayDate = new Date().toISOString().split("T")[0];
  const headers = new Headers();
  headers.set(
    "Authorization",
    "Basic YXBONmxVN21OMmlYOXM6U145elEhM2FGXjBtSUAzdg=="
  );
  headers.set("Message-Reference", messageReference);
  headers.set("Message-Reference-Date", todayDate);
  headers.set("Plugin-Name", "MyShippingPlugin");
  headers.set("Plugin-Version", "1.0");
  headers.set("Shipping-System-Platform-Name", "MyShippingSystem");
  headers.set("Shipping-System-Platform-Version", "2.5");
  headers.set("Webstore-Platform-Name", "MyWebstore");
  headers.set("Webstore-Platform-Version", "3.0");
  /* headers.set(
    "Cookie",
    "BIGipServer~WSB~pl_wsb-express-cbj.dhl.com_443=293349575.64288.0000"
  ); */
  headers.set("Cache-Control", "no-cache");
  headers.set("Pragma", "no-cache");
  headers.set("Expires", "0");

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: headers,
      redirect: "follow",
    });

    if (!response.ok) {
      throw new Error("Network response was not ok " + response.statusText);
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error("Fetch error:", error);
    res.status(500).json({ error: error.message });
  }
}
