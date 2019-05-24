import csv

pathFileVRC = './NCC_min.csv'

with open(pathFileVRC) as fileVRC, open('NCC_min_max.csv', 'w', newline='') as csv_dest:
    csv_reader = csv.reader(fileVRC, delimiter=';')
    csv_writer = csv.writer(csv_dest, delimiter=';')
    written_lines = 0
    line_count = 0
    headers = []
    old_via = ""
    old_cap = ""
    current_via = ""
    min_civ = ""
    max_civ = ""
    current_civ = ""
    current_cap = ""
    for row in csv_reader:
        if line_count == 0:
            csv_writer.writerow([row[0], 'CIVICO MIN', 'CIVICO MAX', row[2]])
        else:
            current_via = row[0]
            current_civ = row[1].split(' ')[0]
            current_civ = current_civ.split('/')[0]
            current_cap = row[2]
            if current_via == old_via and current_cap == old_cap:
                if int(current_civ) < int(min_civ):
                    min_civ = current_civ
                if int(current_civ) > int(max_civ):
                    max_civ = current_civ
            else:
                if old_via != '':
                    csv_writer.writerow([old_via, min_civ, max_civ, old_cap])
                written_lines += 1
                old_cap = current_cap
                old_via = current_via
                min_civ = current_civ
                max_civ = current_civ

        line_count += 1

percentage = written_lines * 100 / line_count

print('Fine\tRead lines:' + str(line_count) + '\tWritten lines: ' + str(written_lines)
      + '\tCompression: ' + str(percentage) + '%')

