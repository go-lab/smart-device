Raspberry Pi-Arduino Laboratory (smart-device)
===============================================
In this repository you can find the basic files needed to built your own Raspberry Pi-Arduino laboratory using websockets.
To use this files you have to following previously the instructions into Wiki (https://github.com/go-lab/smart-device/wiki/How-to-use-Node.js-and-Socket.io-labratories-with-Raspberry-Pi-and-Arduino).

Laboratories
============
You can use the files into "robotic_arm-raspberry-pi" folder reading the README files to understand how can you use each folder. Please, read them carefully before download this repository to your Raspberry Pi or PC.
The other laboratories are in Beta version and are not available for now.

Requirements
============
To use this laboratory you have to count with:<br>
-A knowledge of server and client side on linux systems (Raspbian), managing of packages repositories and development experience.<br>
-A Robotic Arm connected to Arduino. <br>
-A Raspberry Pi Model B (is not tested the recently Model B+, yet).<br>
-An Arduino UNO R3 board.<br>
-Optional: If you want use another server to load the client side files instead of Raspberry Pi (for instance: a PC with Apache server installed to use on client side) you can do it, too.<br>

How works
=========
Read this link into Wiki: https://github.com/go-lab/smart-device/wiki/Robotic-Arm-Laboratory

Laboratories
============
On this folder you can find the laboratories developed with Raspberry Pi and Arduino UNO board.<br>
Currently you can use the Robotic Arm Laboratory downloading the files of the folder "robotic_arm-raspberry-pi".<br>
The other laboratories are in development integration phase so they are not available yet.<br>

Warning
=======
Please, follow the instructions of README and Wiki carefully and remember that every flavour of linux (Raspbian included) has its own characteristics.<br>

About Robotic Arm laboratory and others "on integration development" laboratories with Raspberry Pi
====================================================================================================
The Robotic Arm laboratory was an existing laboratory developed for my doctoral Ph.D. Thesis that concluded with "Cum Laude" score, after several years of research, on UNED (Spanish University for Distance Education), Madrid, on 31th July 2014 with the SiLaRR suite (Integration System for Remote Robotics Laboratories) as results. This laboratory was developed by me as embebed example of integration using SiLaRR (as Led RGB laboratory was included, too). The tools used to this suite were HTTP protocol, Apache, PHP, Java, jQuery, C++, Arduino technology, among others under GPLv3 License.<br>
When GoLab projects offers to me the opportunity of integrate my laboratory in its project I accept without doubt because it is a splendid oportunity to test the possibilities of spread my initial hardware/software development.<br>
The challenges were:<br>
-Adapt the hardware/software of the robotic equipment from the initial tools related to Websockets protocol with Socketi.io, Node.js, Bootstrap, Raspberry Pi, among others.<br> 
-Doing it on that way that other owners of laboratories, as me, could integrate their laboratories on GoLab project using this code as reference and Raspberry Pi and Arduino as hardware tool.<br> 
Finally the callenges were achieved. The objective to integrate an existing laboratory following the specficactions of D 4.1 and D 4.3 from GoLab project, was a success.<br>
The original hardware and electronic schemes of the Robotic Arm laboratory were respected from SiLaRR, and even the Arduino source code it is the same without modifications and respecting the GPLv3 license. The environment was moved to the hardware related (Raspberry Pi) and to the new software/protocols related, too, with success.<br>
A evidence of integration that invites to other owners of laboratories to use this code and my experience to integrate their new, or existing, laboratories into GoLab project.<br>

Acknowledgements
================
-I acknowledgement to Go-Lab Global Online Science Labs for Inquiry Learning at School - FP7-ICT-2011-8 - Project number 317601, the possibility to integrate my laboratory as reference on it, specially to EPFL team for their advices, help and attentions during my stay with them on Lausanne.<br>
-I acknowledgement to Techno-Museum: Discovering the ICTs for Humanity (IEEE Foundation Grant #2011-118LMF) and MUNCYT (Spanish Museum of Science and Technology) the opportunity to show to the public this laboratory as SiLaRR prototype.<br>
-I acknowledgement to Colegio Karbo (A Corunna- Spain) to let me test using Robotic Arm and Led RGB laboratories and evaluating SiLaRR with its teachers and students during my Ph. D. research.<br>
-I acknowledgement to DIEEC Department at UNED the advices and help during my research time while I developed SiLaRR system, specially to Manuel Castro as my mentor and to DIEEC Team and UNED university.<br> 

Final notes
===========
-If you are an owner of a laboratory or you are interested in GoLab an you have any question about the integration of my laboratory, please, don't hesitate to send me and email/message (https://github.com/GermanCF) and I'll try to help you with your laboratory.<br>
-I'll invite you as owner of a laboratory to take in contact with me, or GoLab, to following my steps to integrate your existing laboratory or to develop a new laboartory using this code repository.<br>
-If you have any question about my SiLaRR System (Ph. D. Thesys with the original HTTP protocols, not websockets) or my hardware scheme of Robotic Arm, led RGB, or servo motor laboratories with Arduino, you can send me and email/message or go to my website to known more about them: https://sourceforge.net/projects/silarr/<br>

Finally, as owner of a laboratory all of us want that our designs will be usefull for other people, Go-Lab project looks for this objective and can spread your development among thousand of Schools/Academic institutions around the world. Now you have this step more closer with this repostory. Think about it!.

Disclaimer
==========
THIS SOFTWARE AVAILABLE ON THIS REPOSITORY IS PROVIDED "AS IS" AND ANY EXPRESSED OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE SPANISH UNIVERSITY FOR DISTANCE EDUCATION (UNED), OR ANY OF THEIR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.<br>

Without limiting the foregoing, make no warranty that:<br>

The software will meet your requirements.<br>
The software will be uninterrupted, timely, secure or error-free.<br>
The results that may be obtained from the use of the software will be effective, accurate or reliable.<br>
Te quality of the software will meet your expectations.<br>
Ay errors in the software obtained from this web repository will be corrected.<br>

Software and its documentation made available on this repository:<br>

Could include technical or other mistakes, inaccuracies or typographical errors. Contributors may make changes to the software or documentation made available on its web site.<br>
may be out of date and this repository, its contributors, and UNED make no commitment to update such materials.<br>
This repository, its contributors, and UNED assume no responsibility for errors or ommissions in the software or documentation available from this repository site.<br>

In no event shall this repository, it's contributors, or UNED be liable to you or any third parties for any special, punitive, incidental, indirect or consequential damages of any kind, or any damages whatsoever, including, without limitation, those resulting from loss of use, data or profits, whether or not this repository, its contributors, or UNED has been advised of the possibility of such damages, and on any theory of liability, arising out of or in connection with the use of this software.<br>

The use of the software downloaded through this repository site is done at your own discretion and risk and with agreement that you will be solely responsible for any damage to your computer system or loss of data that results from such activities. No advice or information, whether oral or written, obtained by you from this repository, its website, its contributors, or UNED shall create any warranty for the software.<br>
