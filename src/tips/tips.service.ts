import { Injectable } from '@nestjs/common';
import { CreateTipDto } from './dto/create-tip.dto';
import { UpdateTipDto } from './dto/update-tip.dto';
import { Tip } from './entities/tip.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TipsService {
  constructor(@InjectRepository(Tip) private tipRepository: Repository<Tip>){}

  create(createTip: CreateTipDto) {
    return this.tipRepository.save(createTip);
  }

  findAll() {
    return this.tipRepository.find();
  }

  findOne(id: number) {
    return this.tipRepository.findOneBy({ id: id });
  }

  update(id: number, updateTipDto: UpdateTipDto) {
    return this.tipRepository.update(id, updateTipDto);
  }

  remove(id: number) {
    return this.tipRepository.delete(id);
  }

  likeTip(id: number) {
    this.findOne(id).then((tip) => {
      return this.tipRepository.update(id, { likes:  tip.likes + 1 });
    });
  }

  dislikeTip(id: number) {
    this.findOne(id).then((tip) => {
      return this.tipRepository.update(id, { likes:  tip.likes - 1 });
    });
  }

  reset() {
    return this.tipRepository.update({}, { showed_in_date: null });
  }
}
