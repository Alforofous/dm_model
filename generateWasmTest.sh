emcc sources/webAssembly/add_numbers.c -o addNumbers.js -s MODULARIZE=1 -s EXPORT_NAME="createModule" -s "EXPORTED_RUNTIME_METHODS=['ccall']"
