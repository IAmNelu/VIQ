import csv

pathFileVRC = './NumeroCivico_CAP_WGS84_.csv'

with open(pathFileVRC) as fileVRC, open('NCC_min.csv', 'w', newline='') as csv_dest:
    csv_reader = csv.reader(fileVRC, delimiter=';')
    csv_writer = csv.writer(csv_dest, delimiter=';')
    line_count = 0
    for row in csv_reader:
        csv_writer.writerow([row[2], row[3], row[5]])

        line_count += 1

print('Fine ' + str(line_count))

