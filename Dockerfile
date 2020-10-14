FROM ghost

COPY /content /content

# ENV key=value

CMD [ "ghost", "start" ]