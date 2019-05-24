import csv

pathFileVRC = './VRC2017.csv'

with open(pathFileVRC) as fileVRC, open('VRC_min.csv', 'w', newline='') as csv_dest:
    csv_reader = csv.reader(fileVRC, delimiter=';')
    csv_writer = csv.writer(csv_dest, delimiter=';')
    line_count = 0
    for row in csv_reader:
        csv_writer.writerow([row[0], row[1], row[2], row[3], row[4], row[5], row[6], row[12]])
        line_count += 1

print('Fine ' + str(line_count))

