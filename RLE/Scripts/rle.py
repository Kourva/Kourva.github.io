from pyscript import Element
    
# Encode data
def encode():
    try:
        encode_input = Element("encode_input").value  # Input
        encode_output = Element("encode_output")      # Output

        if encode_input == "":
            encode_output.write("Input is required for decoding!")
            return

        # RLE Compression
        data = encode_input
        compressed_data = ""
        count = 1
        for i in range(1, len(data)):
            if data[i] == data[i - 1]:
                count += 1
            else:
                compressed_data += str(count) + data[i - 1]
                count = 1
        compressed_data += str(count) + data[-1]

        # Set Output
        encode_output.write(compressed_data)
    except Exception as ex:
        Element("encode_output").write(f"[!] Error\n\n{ex}")

# Decode data
def decode():
    try:
        decode_input = Element("decode_input").value  # Input
        decode_output = Element("decode_output")      # Output

        if decode_input == "":
            decode_output.write("Input is required for decoding!")
            return

        # RLE De-Compression
        data = decode_input
        decompressed_data = ""
        count = ""
        for character in data:
            if character.isdigit():
                count += character
            else:
                decompressed_data += int(count) * character
                count = ""

        # Set Output
        decode_output.write(decompressed_data) 
    except Exception as ex:
        Element("decode_output").write(f"[!] Error\n\n{ex}")

# Reset Encode Output
def en_reset():
    encode_output = Element("encode_output")
    encode_output.write("")

# Reset Decode Output
def de_reset():
    decode_output = Element("decode_output")
    decode_output.write("")