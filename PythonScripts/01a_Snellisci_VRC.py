import csv

pathFileVRC = './00_f_VRC2017.csv'
#apre il file csv e crea un csv reader
with open(pathFileVRC) as fileVRC, open('01a_f_VRC_min.csv', 'w', newline='') as csv_dest:
    csv_reader = csv.reader(fileVRC, delimiter=';')
    csv_writer = csv.writer(csv_dest, delimiter=';')
    line_count = 0
    for row in csv_reader:
        # elabora ogni singola riga dal file letto e
        # salva nel csv.writer solo alcuni campi delprecedente CSV
        csv_writer.writerow([row[0], row[1], row[2], row[3], row[4], row[5], row[6], row[12]])
        line_count += 1

print('Fine ' + str(line_count))

