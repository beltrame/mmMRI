# -*- coding: utf-8 -*-
"""
Created on Sun Oct 19 13:55:44 2014

@author: beltrame
"""

import sys, getopt

def main(argv):
   maskfile = ''
   components = ''
   try:
      opts, args = getopt.getopt(argv,"hm:c:",["maskfile=","components="])
      if len(argv)<2: raise getopt.GetoptError("USAGE:")
   except getopt.GetoptError:
      print 'pipeline.py -m <maskfile> -c <# components>'
      sys.exit(2)
   for opt, arg in opts:
      if opt == '-h':
         print 'Usage:\n\tpipeline.py -m <maskfile> -c <# components>'
         sys.exit()
      elif opt in ("-m", "--maskfile"):
         maskfile = arg
      elif opt in ("-c", "--components"):
         components = arg
   print 'Input file is ', maskfile
   print 'Components ', components

if __name__ == "__main__":
   main(sys.argv[1:])
    