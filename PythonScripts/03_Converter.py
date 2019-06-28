import csv
import json
import sys

if len(sys.argv) != 3:
    print('Errore, per convertire il file CSV in JASON bisogna passare come argomento')
    print('il path del file da convertire e il nome del file destinazione')
    sys.exit(1)

path = sys.argv[1]
name = sys.argv[2]
# i tre parametri che prende da linea di comando sono il path di un file csv e il nome del file 
# json di desinazione
with open(path) as csv_file:
    csv_reader = csv.reader(csv_file, delimiter=';')
    line_count = 0
    headers = []
    arrays = []
    data = []
    for row in csv_reader:
        single_line_data = {}
        if line_count == 0:
            for element in row:
                headers.append(element) # popola l'array di intestazioni
            line_count += 1
        else:
            for header, value in zip(headers, row): # loop sull'array creato da zip con header e riga
                single_line_data[header] = value # popola il singolo oggetto json
            data.append(single_line_data) # aggiunge l'oggetto all'array
            line_count += 1
    json_data = json.dumps(data) # crea un oggetto json dall'array
    with open(name, 'w') as outfile:
        json.dump(data, outfile) # scrive il json sul file
    print('Processed ' + str(line_count) + ' lines.') #statistiche di compressione


