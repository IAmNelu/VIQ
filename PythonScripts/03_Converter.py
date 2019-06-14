import csv
import json
import sys

if len(sys.argv) != 3:
    print('Errore, per convertire il file CSV in JASON bisogna passare come argomento')
    print('il path del file da convertire e il nome del file destinazione')
    sys.exit(1)

path = sys.argv[1]
name = sys.argv[2]

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
                headers.append(element)
            line_count += 1
        else:
            for header, value in zip(headers, row):
                single_line_data[header] = value
            data.append(single_line_data)
            line_count += 1
    json_data = json.dumps(data)
    with open(name, 'w') as outfile:
        json.dump(data, outfile)
    print('Processed ' + str(line_count) + ' lines.')


