import csv

pathFileNCC = './01b_f_NCC_min.csv'

with open(pathFileNCC) as fileVRC, open('02_f_NCC_min_max.csv', 'w', newline='') as csv_dest:
    csv_reader = csv.reader(fileVRC, delimiter=';')
    csv_writer = csv.writer(csv_dest, delimiter=';')
    array_oggetti = []
    old_headers = []
    data = []
    line_count = 0
    for row in csv_reader:
        single_line_data = {}
        if line_count == 0:
            for element in row:
                old_headers.append(element)
        else:
            for header, value in zip(old_headers, row):
                if(header == 'CIVICO'):
                    cose = value.split(" ")
                    cose2 = cose[0].split("/")
                    value = cose2[0]                   

                single_line_data[header] = value
            data.append(single_line_data)
        line_count += 1
    data.sort(key=lambda x: int(x['CIVICO']))
    data.sort(key=lambda x: x['VIA'])
    via_processante = data[0]['VIA']
    cap_corrente = data[0]['CAP']
    civico_min = data[0]['CIVICO']
    civico_corrente = data[0]['CIVICO']
    csv_writer.writerow(['VIA', 'CIVICO MIN', 'CIVICO MAX', 'CAP'])
    written_lines  = 0
    for one_row in data:
        if via_processante != one_row['VIA'] or cap_corrente != one_row['CAP']:
             csv_writer.writerow([via_processante, civico_min, civico_corrente, cap_corrente])
             written_lines += 1 
             via_processante = one_row['VIA']
             civico_min = one_row['CIVICO']
             cap_corrente = one_row['CAP']
        civico_corrente = one_row['CIVICO']

    percentage = 100 - written_lines * 100 / line_count
    print('Fine\tRead lines:' + str(line_count) + '\tWritten lines: ' + str(written_lines)
       + '\tCompression: ' + str(percentage) + '%')

