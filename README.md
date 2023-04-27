# Guia para desarrollar con docker el AG
1. Crear la imagen para desarrollo:  `docker build -t un-campusconnect_ag-dev -f Dockerfile.dev .`
2. Ejecutar el contenedor: `docker run -p 5000:5000 -v /home/ivanm/Documents/UN-CampusConnect_ag/:/app/ --name un-campusconnect_ag-dev un-campusconnect_ag-dev`
_Nota: Donde está **/home/ivanm/Documents/UN-CampusConnect_ag/** deben poner la ruta donde tienen la carpeta del ag en su computador_