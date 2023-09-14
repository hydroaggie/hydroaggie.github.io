---
layout: post
title: Working with SNODAS data
date: 2021-10-25 
description: A tutorial on how to download and post-process SNODAS data
tags: data postprocess 
categories: data
giscus_comments: true
related_posts: true
toc:
  sidebar: left
---

I will show how to post-process SNODAS data using a suite of tools in the command line. This tutorial has only been tested on Linux/Ubuntu system, but the method should be the same for other OS.

Some notes about the SNODAS snow data:

- The [User guide](https://nsidc.org/sites/nsidc.org/files/G02158-V001-UserGuide_2.pdf) provides the most complete information about SNODAS.
- the masked snow data files for the CONUS since Oct 2003; the unmasked data is for the 

## Software requirement

`nco`, Docker

## Download data 
See https://nsidc.org/support/64231694-FTP-Client-Data-Access for more details.

I used wget to download all the snow data:

```bash
wget --ftp-user=anonymous -r -nd ftp://sidads.colorado.edu/DATASETS/NOAA/G02158/masked
```

## Post-process

### Untar and unzip

```bash
# untar
ls *.tar | xargs -i tar xf {}

# unzip .gz files
gunzip *.gz  # note, this will replace original files!
```

You will have both *.dat and *.txt file with the same file name.

Each .dat file is differentiated by the product code. See SNODAS user guide for more details.

- `us_ssmv11034tS*.dat` is for SWE

### Subset data using pyrs

See https://nsidc.org/support/how/subsetting-and-reformatting-nsidc-pyrs-docker-container for more info.

- prepare data. Move all  `us_ssmv11034tS__T0001TTNATS*.dat` into a single folder.

- Download docker (**need root permission**). Follow the [instructions](https://docs.docker.com/engine/install/ubuntu/) for installing Linux-ubuntu version.

- Run docker. This will mount input datasets as well as output directory, and run `pyrs` interactively.

- ```bash
  docker run -it --rm -v /mnt/4tbd/pin/SNODAS/extracted-files/us_swe/extracted-files/dat/:/DATASETS -v /mnt/4tbd/pin/SNODAS/extracted-files/us_swe/extracted-files/netcdf/:/output  nsidc/pyrs_container:v1.1.0
  ```
  - Run PyRS
  ```bash
  # enter command for interactive operation
  $ pyrs
  # choose data source
  Source type (one of SNODAS, NSIDC-0051, NSIDC-0081):SNODAS
  # choose format
  Output format (one of geotiff, netcdf): netcdf
  # then follow the prompts to enter input/output directory
  Input directory [/]:/DATASETS
  Output directory [/]:/output
  # wheter to subset the data
  Would you like to subset the data? [y/N]:y
  # enter the box region in decimal
  westernmost bound (decimal degrees from -125.0 to -67.0) [-125.0]:-108
  northernmost bound (decimal degrees from 25.0 to 53.0) [53.0]:40
  easternmost bound (decimal degrees from -108.0 to -67.0) [-67.0]:-106
  southernmost bound (decimal degrees from 25.0 to 40.0) [25.0]:38
  # wait for it to process
  # exit when it is done
  exit
  ```

### combine netcdf files

- download [NCO tookit](http://nco.sourceforge.net/)
For Ubuntu/Linux:
```bash
aptitude install nco
```

- Combine all daily netcdf files using `ncrcat` command:

```bash
ls | grep \.nc | ncrcat -o SWE_2014-east-taylor.nc
```
- remove concat history from the attributes field using `ncatted` command. This can help to reduce the netcdf filesize.

```bash
ncatted -a nco_input_file_list,global,d,, SWE_2014-east-taylor.nc
```

​	For details on how to use `ncatted`, see http://nco.sourceforge.net/nco.html#ncatted

​	- view the contect of netcdf using `ncdump -hs SWE_2014.nc`

### Subset region

Use `ncea` to subset regions. See [documentation](http://nco.sourceforge.net/nco.html#xmp_ncea) for more details.

```bash
# format
ncea -d lat,minimum_lat,maximum_lat -d lon,minimum_lon,maximum_lon in.nc out.nc
# for example
ncea -d lat,38.0,40.0 -d lon,-108.0,-106.0 SNODAS_SWE-US-2003-2021.nc SNODAS_SWE_EastTaylor-2003-2021.nc
```

