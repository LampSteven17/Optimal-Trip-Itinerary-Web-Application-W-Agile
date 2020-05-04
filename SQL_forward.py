#! /usr/bin/env python3

import subprocess

your_name_string = "ryanhk@kabul.cs.colostate.edu"

# apparently ports 49152-65535 are good to use for this

port = "56247"

call_string = port
call_string += ":faure.cs.colostate.edu:3306"

print("Connecting to port: ", port)

subprocess.call(["ssh", "-L", call_string, your_name_string])