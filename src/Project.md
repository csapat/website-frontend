**The concept**  
    
Our team’s cansat is intended to be a proof-of-concept type prototype of an easily producible and cost-effective device. One or more of these devices could be deployed on any suitable planet. The device measures many sets of data, mostly related to the planet’s weather conditions and phenomenons. Although the satellite will be sent up to a height of only 1 km, it is also expected to perform well at higher altitudes. To fulfill the main goal of the device described above, a directed landing is not necessary, nonetheless, as a separate and independent challenge, we have decided to complete a directed landing. With the help of GPS data, the system will land safely by itself as close to a pre-specified point on the ground as possible.
  
**Directed Landing**  
  
The device will fly with two self-sewn parachutes: a hemispherical parachute and a paraglider. As soon as the CanSat is ejected from the carrier, the first, hemispherical parachute opens. Its purpose is to bring the device down to a lower height and to a lower descent speed where the paraglider can be safely launched. The importance of this is to avoid high speed turbulences and to shorten the time spent gliding in order to land closest to the pre-set coordinates as possible. The software which will drive the glider utilises the GPS coordinates, the altitude, acceleration, inclination (gyroscope), direction of the magnetic north pole (magnetometer). The path of the descent will be calculated before the flight on the ground station, and thus will be transmitted to the flight unit. The software also determines the optimal altitude where the glider should be opened to reach the landing point by moving along a straight path during the descent, knowing the gliding ratio. If the launch of the second parachute is successful, during the flight the flight unit will make corrections to  countervail unpredictable external forces by pulling the strings in order to stay on the previously calculated track. When the landing point is reached, the device will circle above it until it touches the ground.  
Making proper computations for the landing path and the corrections requires a 3D model of the paraglider, drawn in Fusion 360, to determine the drag and lift coefficients of it using Autodesk CFD.  
The pattern of the glider was drawn by SingleSkin. A coated ripstop nylon fabric is used as the material of the glider and it is sewed together with a polyester thread (suggested for parachutes). The leading edge is strengthened by plastic rods and the strings are attached by plastic D-rings to the material. The two servo motors, responsible for pulling the strings, are located at the top of the satellite frame.  
  
**Measurements**  
  
The device will be equipped with several sensors, the majority of them measuring data related to weather conditions, be it a cause or a consequence of a certain weather phenomenon.  
In conformity with the guidelines, measuring air temperature and air pressure are fundamental to the project. In addition, we will also be measuring air humidity and UV light intensity.  
Furthermore, an electrometer will be measuring the potential difference during the flight. With the help of this, an indicative value for chance of lightning can be attempted to be calculated, taking the measured air pressure, air temperature and humidity values into account.   
The measured values provide a basic impression of the weather conditions and the structure of the atmospheric layers on the given planet. Using this dataset, certain weather models could be attempted to be constructed, with them being able to even predict weather on a short-term basis.  
The canast will also be measuring the strength and direction of the planet’s magnetic field with a magnetometer. We are developing a software which is able to visualize the data, being able to demonstrate the characteristics of a planet’s magnetic field given a sufficient amount of data.  
This data can also be linked to the main project’s goal. According to a paper published by Appleton Laboratory, there is a clear relation between Earth’s magnetic field and weather conditions, as in temperature and pressure, but the paper suggests that there’s no precise explanation of this as of now.  
Presumably, the weather condition values are actually influenced by the amount of solar wind, hence a radiation detector will be equipped to complement the measurement.  
The device could be capable of conducting the necessary thorough research regarding this topic; to find out the exact causes and effects.  
Equipped with the results of this research, the weather model could be refined even more, now taking the magnetic field’s strength into consideration.  
  
**Electronics**  
  
The electronics will be centered around the ATMEGA328 (We use an Arduino Nano for the breadboard phase). A LoRa module (Ra-02) will be used to send the telemetry data. We are planning to make our own printed circuit boards. The main power will be supplied by lithium-polymer batteries. The cell voltage of these batteries is 3.7 V which is less than the required 5 V for some of the sensors. We tried to use a DD06CVSA module which features a battery protection circuit and a boost converter to provide 5 volts at 2 amps, but the Arduino Nano’s and the sensors' standby current was too low, hence the module kept turning itself off. Therefore we have decided to design our own power supply.  
We have decided to log the measured data to an SD card, so the data won't be lost in case the radio connection is interrupted.  
  
**Sensors**  
  
The sensors should be divided in two groups. The ones which are responsible for the landing and position determination and the others that are responsible for climate condition measurements.  
Landing Sensors  
GY-GPS6MV2 GPS module  
MPU-9250 Gyroscope, Accelerometer, Magnetometer (GY-91 module)  
BMP280 Pressure and Temperature sensor  
Weather sensors  
PIN diode radiation detector  
Two BMP280 Pressure and Temperature sensor  
Three GUVA-S12SD UV sensors (At three different positions: bottom, top and side)  
DHT11 Humidity and Temperature sensor  
Electrometer (charge sensitive amplifier built with FETs)  
  
**Mechanical design**  
  
As we have already had some bad experience with 3D printed parts, we have decided not to use them as the frame of the satellite, because we found them too fragile, not being able to withstand an accidental parachute failure. Instead, we tried to use a glass fibre composite as the shell of the satellite. We have already made a few attempts at making glass fibre tubes and the results look promising. The design of the inside support structure is still under process.  
  
**Further possibilities**  
  
Extended with solar panels, the device shows many possibilities how it could be utilised. It could be used in space exploration, helping explore foreign planet’s weather conditions on a larger scale.  
It could also be easily deployed at high quantities on the Earth’s surface to help observe weather changes at isolated places, especially those that are heavily affected by the rapid changes of our planet’s climate, for example measuring temperature and humidity in rainforests, or observing the movements and temperature changes of icecaps.  
