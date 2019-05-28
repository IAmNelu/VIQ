
filename = 'no_slash.json'
destfilename = 'no_slash_no_quote.json'
with open(filename) as f, open (destfilename, 'w') as dest:
  countV = 0
  while True:
    c = f.read(1)
    if not c:
      print ("End of file")
      break

    if c != '"':
        dest.write(c)       
    if c == '"':
        countV += 1
        if countV % 4 == 1 or countV % 4 == 2:
            dest.write(c)

